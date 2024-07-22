package sigma.chackcheck.domain.bookBorrow.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sigma.chackcheck.domain.bookBorrow.domain.BookBorrow;

public interface BookBorrowRepository extends JpaRepository<BookBorrow, Long> {
    @Query("SELECT bb FROM BookBorrow bb WHERE bb.bookDetailId = :id AND bb.returnDate IS NULL")
    Optional<BookBorrow> findCurrentlyBorrowedBookListByBookDetailId(Long id);

    @Query("SELECT bb FROM BookBorrow bb WHERE bb.bookDetailId = :id AND bb.userId = :userId AND bb.returnDate IS NULL")
    Optional<BookBorrow> findCurrentlyBorrowedBookListByBookDetailIdAndUserId(Long userId, Long id);
    @Query("SELECT bb FROM BookBorrow bb WHERE bb.userId = :userId AND bb.returnDate IS NULL")
    List<BookBorrow> findCurrentlyBorrowedBookListByUserId(Long userId);

    @Query("SELECT bb FROM BookBorrow bb WHERE bb.userId = :userId")
    Page<BookBorrow> findByUserId(Long userId, Pageable pageable);
}
