package sigma.chackcheck.domain.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sigma.chackcheck.domain.book.domain.BookCategory;

@Repository
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {
}
