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
    Page<BookCategory> findAllByCategoryName(@Param("categoryName") String categoryName,
        Pageable pageable);

    @Query("SELECT bc FROM BookCategory bc JOIN FETCH bc.book b JOIN bc.category c WHERE c.categoryName = :categoryName "
        + "AND"
        + " (b.title LIKE %:keyword% OR b.author LIKE %:keyword% OR b.publishYear LIKE %:keyword% OR b.publisher LIKE %:keyword%)")
    Page<BookCategory> findAllByCategoryNameAndKeyword(
        @Param("categoryName") String categoryName,
        @Param("keyword") String Keyword, Pageable pageable);
}
