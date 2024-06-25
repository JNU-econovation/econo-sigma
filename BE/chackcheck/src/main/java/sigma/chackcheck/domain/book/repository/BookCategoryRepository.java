package sigma.chackcheck.domain.book.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import sigma.chackcheck.domain.book.domain.BookCategory;

@Repository
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {
    @Query("SELECT bc FROM BookCategory bc JOIN FETCH bc.book b JOIN bc.category c WHERE c.categoryName = :categoryName")
    Page<BookCategory> findAllByCategoryName(@Param("categoryName") String categoryName, Pageable pageable);
}
