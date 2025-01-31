package sigma.chackcheck.domain.book.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sigma.chackcheck.domain.book.domain.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    Page<Book> findAll(Pageable pageable);

    @Query("SELECT b FROM Book b WHERE b.title LIKE %:keyword% OR b.author LIKE %:keyword% OR b.publishYear LIKE %:keyword% OR b.publisher LIKE %:keyword%")
    Page<Book> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

    Optional<Book> findByTitle(String title);
}
