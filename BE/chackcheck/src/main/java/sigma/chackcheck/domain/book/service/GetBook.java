package sigma.chackcheck.domain.book.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sigma.chackcheck.common.pagination.PagePolicy;
import sigma.chackcheck.common.service.GetEntityUsecase;
import sigma.chackcheck.common.service.Pagination;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.domain.BookApprove;
import sigma.chackcheck.domain.book.domain.BookCategory;
import sigma.chackcheck.domain.book.domain.BookDetail;
import sigma.chackcheck.domain.book.repository.BookApproveRepository;
import sigma.chackcheck.domain.book.repository.BookCategoryRepository;
import sigma.chackcheck.domain.book.repository.BookDetailRepository;
import sigma.chackcheck.domain.book.repository.BookRepository;

@Service
@RequiredArgsConstructor
public class GetBook implements GetEntityUsecase<Book>, Pagination<Book> {

    private final BookRepository bookRepository;
    private final BookCategoryRepository bookCategoryRepository;
    private final BookApproveRepository bookApproveRepository;
    private final BookDetailRepository bookDetailRepository;

    @Override
    public Book getOneEntity(Long id) {
        return bookRepository.findById(id).orElseThrow(
            () -> new IllegalArgumentException("책이 없어용"));
    }

    @Override
    public List<Book> getAllEntities() {
        return bookRepository.findAll();
    }

    @Override
    public Page<Book> getBookPage(int page) {
        Pageable pageable = createDefaultPageRequest(page, PagePolicy.DEFAULT_PAGE);
        return bookRepository.findAll(pageable);
    }

    @Override
    public Page<Book> getBookPageByCategoryName(String categoryName, int page) {
        Pageable pageable = createDefaultPageRequest(page, PagePolicy.DEFAULT_PAGE);

        Page<BookCategory> bookCategoryListByCategoryName =
            bookCategoryRepository
                .findAllByCategoryName(categoryName, pageable);

        return bookCategoryListByCategoryName
            .map(BookCategory::getBook);
    }

    @Override
    public Page<Book> getBookPageBySearch(String keyword, int page) {
        Pageable pageable = createDefaultPageRequest(page, PagePolicy.DEFAULT_PAGE);

        return bookRepository.findByKeyword(keyword, pageable);
    }

    @Override
    public Page<BookApprove> getBookApprovePage(int page) {
        Pageable pageable = createDefaultPageRequest(page, PagePolicy.DEFAULT_PAGE);
        return bookApproveRepository.findAll(pageable);
    }

    public List<BookDetail> getAllBookDetailsByBookId(Book book) {
        return bookDetailRepository.findBookDetailsByBook(book);
    }
}
