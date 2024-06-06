package sigma.chackcheck.domain.book.service;

import java.util.List;
import sigma.chackcheck.domain.book.domain.Book;

public interface GetBookUsecase {
    Book getOneBook(Long id);
    List<Book> getAllBooks();
}
