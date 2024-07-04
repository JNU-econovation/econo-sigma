package sigma.chackcheck.domain.book.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.domain.BookApprove;
import sigma.chackcheck.domain.book.domain.BookDetail;

@Service
@RequiredArgsConstructor
public class BookService {
    private final GetBook getBook;

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
}
