package sigma.chackcheck.domain.book.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sigma.chackcheck.common.pagination.PagePolicy;
import sigma.chackcheck.domain.book.domain.Book;

@Service
@RequiredArgsConstructor
public class BookService {
    private final GetBook getBook;

    public Book getOneBook(Long id) {
        return getBook.getOneBook(id);
    }

    public List<Book> getAllBooks() {
        return getBook.getAllBooks();
    }

    public Page<Book> getBookPage(int page) {
        return getBook.getBookPage(page);
    }

    public Page<Book> getBookPageByCategoryName(String categoryName, int page){
        return getBook.getBookPage(categoryName, page);
    }
}
