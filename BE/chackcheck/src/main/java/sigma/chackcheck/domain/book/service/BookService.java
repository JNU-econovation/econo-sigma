package sigma.chackcheck.domain.book.service;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sigma.chackcheck.common.pagination.PagePolicy;
import sigma.chackcheck.common.util.CategoryParser;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.domain.BookApprove;
import sigma.chackcheck.domain.book.domain.BookApprove.BookWithCategories;
import sigma.chackcheck.domain.book.domain.BookCategory;
import sigma.chackcheck.domain.book.domain.BookDetail;
import sigma.chackcheck.domain.book.domain.Category;
import sigma.chackcheck.domain.book.dto.request.CreateBookApproveRequest;
import sigma.chackcheck.domain.book.dto.request.CreateBookRequest;
import sigma.chackcheck.domain.book.dto.request.CreateBookRequestDTO;
import sigma.chackcheck.domain.book.repository.BookApproveRepository;
import sigma.chackcheck.domain.book.repository.BookCategoryRepository;
import sigma.chackcheck.domain.book.repository.BookDetailRepository;

@Service
@RequiredArgsConstructor
public class BookService {
    private final GetBook getBook;
    private final PostBook postBook;
    private final CategoryParser categoryParser;
    private final BookDetailRepository bookDetailRepository;
    private final BookApproveRepository bookApproveRepository;
    private final BookCategoryRepository bookCategoryRepository;

    @Value("${cloud.aws.s3.default.image.url}")
    private String defaultImageUrl;

    public Book getOneBook(Long id) {
        return getBook.getOneEntity(id);
    }

    public BookDetail getOneBookDetail(Long id){
        return getBook.getOneBookDetailById(id);
    }

    public List<Book> getAllBooks() {
        return getBook.getAllEntities();
    }

    public Page<Book> getBookPage(int page) {
        return getBook.getBookPage(page);
    }

    public Page<Book> getBookPageByCategoryName(String categoryName, int page){
        return getBook.getBookPageByCategoryName(categoryName, page);
    }

    public Page<Book> getBookPageByCategoryNameAndKeyword(String categoryName, String keyword, int page){
        return getBook.getBookPageByCategoryNameAndKeyword(categoryName, keyword, page);
    }

    public Page<Book> getBookPageBySearch(String keyword, int page){
        return getBook.getBookPageBySearch(keyword, page);
    }

    public Page<BookApprove> getBookApprovePage(int page) {
        return getBook.getBookApprovePage(page);
    }

    public List<BookDetail> getAllBookDetailsByBookId(Long id){
        Book book = getOneBook(id);
        return getBook.getAllBookDetailsByBookId(book);
    }

    public Page<BookDetail> getAllBookDetails(int page){
        Pageable pageable = PageRequest.of(page, 8);
        return bookDetailRepository.findAll(pageable);
    }

    public Long createBookApprove(CreateBookApproveRequest createBookApproveRequest, Long userId){
        String url = createBookApproveRequest.getImageURL();
        if (url == null) {
            url = defaultImageUrl;
        }

        BookApprove bookApprove = CreateBookApproveRequest.toEntity(createBookApproveRequest, userId);
        bookApprove.setImageURL(url);
        return postBook.saveBookApprove(bookApprove);
    }

    @Transactional
    public void createBook(CreateBookRequest createBookRequest) {
        List<BookApprove> bookApproveList = createBookRequest.getCreateBookRequestDTOList()
            .stream()
            .map(CreateBookRequestDTO::getId)
            .map(getBook::getBookApprove)
            .toList();

        bookApproveList.stream()
            .map(bookApprove -> {
                BookWithCategories bookWithCategories = BookApprove.toBookWithCategories(
                    getOrCreateBook(bookApprove), bookApprove.getCategories()
                );

                bookApproveRepository.deleteById(bookApprove.getId());

                return bookWithCategories;
            })
            .map(bookWithCategories -> {
                Long savedBookId = postBook.saveBook(bookWithCategories.getBook());
                Book savedBook = getBook.getOneEntity(savedBookId);

                categoryParser.parseCategory(bookWithCategories.getCategories())
                    .stream()
                    .map(getBook::getCategoryByCategoryName)
                    .map(category -> BookCategory.builder()
                        .category(category)
                        .book(savedBook)
                        .build())
                    .forEach(postBook::saveBookCategory);

                return BookApprove.toBookDetail(savedBook);
            })
            .forEach(postBook::saveBookDetail);
    }

    private Book getOrCreateBook(BookApprove bookApprove) {
        return getBook.getBookByTitle(bookApprove.getTitle())
            .orElseGet(() -> BookApprove.toBook(bookApprove));
    }

    @Transactional
    public void softDeleteBookDetail(Long bookDetailId){
        bookDetailRepository.deleteById(bookDetailId);
    }

    public List<String> getCategories(Book book) {
        List<BookCategory> categoryList = bookCategoryRepository.findAllByBook(book);
        return categoryList.stream()
            .map(bookCategory -> bookCategory.getCategory().getCategoryName())
            .toList();
    }

    public void deleteBookApprove(CreateBookRequest createBookRequest) {
         createBookRequest.getCreateBookRequestDTOList().stream()
             .map(CreateBookRequestDTO::getId)
             .forEach(bookApproveRepository::deleteById);
    }
}
