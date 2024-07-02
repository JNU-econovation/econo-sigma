package sigma.chackcheck.domain.bookBorrow.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sigma.chackcheck.domain.bookBorrow.domain.BookBorrow;

public interface BookBorrowRepository extends JpaRepository<BookBorrow, Long> {
    @Query("SELECT bb FROM BookBorrow bb WHERE bb.bookDetailId = :id AND bb.returnDate IS NULL")
    Optional<BookBorrow> findCurrentlyBorrowedBookListByBookDetailId(Long id);

}
