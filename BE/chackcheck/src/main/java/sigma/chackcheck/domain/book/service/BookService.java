package sigma.chackcheck.domain.book.service;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
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

@Service
@RequiredArgsConstructor
public class BookService {
    private final GetBook getBook;
    private final PostBook postBook;
    private final CategoryParser categoryParser;

    public Book getOneBook(Long id) {
        return getBook.getOneEntity(id);
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

    public Long createBookApprove(CreateBookApproveRequest createBookApproveRequest, Long userId){
        BookApprove bookApprove = CreateBookApproveRequest.toEntity(createBookApproveRequest, userId);
        return postBook.saveBookApprove(bookApprove);
    }

    @Transactional
    public void createBook(CreateBookRequest createBookRequest){
        List<BookApprove> bookApproveList = createBookRequest.getCreateBookRequestDTOList()
            .stream()
            .map(CreateBookRequestDTO::getId)
            .map(getBook::getBookApprove)
            .toList();

        bookApproveList.forEach(bookApprove -> System.out.println(bookApprove.getCategories()));

//        Todo: deleteBook.deleteBookApprove 구현
//        bookApproveList.stream()
//            .forEach();

        bookApproveList.stream()
            .map(bookApprove -> BookApprove.toBookWithCategories(
                BookApprove.toBook(bookApprove), bookApprove.getCategories()
                ))
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
    }
