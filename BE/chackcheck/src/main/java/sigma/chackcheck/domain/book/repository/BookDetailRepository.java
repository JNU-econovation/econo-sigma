package sigma.chackcheck.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sigma.chackcheck.domain.book.domain.BookDetail;

@Repository
public interface BookDetailRepository extends JpaRepository<BookDetail, Long> {
}
