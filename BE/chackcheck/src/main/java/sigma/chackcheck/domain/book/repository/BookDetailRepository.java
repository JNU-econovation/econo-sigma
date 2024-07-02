package sigma.chackcheck.domain.book.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.domain.BookDetail;

@Repository
public interface BookDetailRepository extends JpaRepository<BookDetail, Long> {
    List<BookDetail> findBookDetailsByBook(Book book);
}
