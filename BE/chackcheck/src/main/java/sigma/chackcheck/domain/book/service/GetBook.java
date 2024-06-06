package sigma.chackcheck.domain.book.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sigma.chackcheck.common.pagination.PagePolicy;
import sigma.chackcheck.common.pagination.service.Pagination;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.repository.BookRepository;

@Service
@RequiredArgsConstructor
public class GetBook implements GetBookUsecase, Pagination<Book> {

    private final BookRepository bookRepository;

    @Override
    public Book getOneBook(Long id) {
        return bookRepository.findById(id).orElseThrow(
            () -> new IllegalArgumentException("책이 없어용"));
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Page<Book> getBookPage(int page) {
        Pageable pageable = createDefaultPageRequest(page, PagePolicy.DEFAULT_PAGE);
        return bookRepository.findAll(pageable);
    }

}
