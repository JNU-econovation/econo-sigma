package sigma.chackcheck.domain.bookBorrow.service;

import java.time.LocalDate;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sigma.chackcheck.domain.book.domain.BookDetail;
import sigma.chackcheck.domain.book.repository.BookDetailRepository;
import sigma.chackcheck.domain.bookBorrow.domain.BookBorrow;
import sigma.chackcheck.domain.bookBorrow.repository.BookBorrowRepository;
import sigma.chackcheck.domain.user.domain.User;

@Service
@RequiredArgsConstructor
@Transactional
public class PutBookBorrow {
    private final BookBorrowRepository bookBorrowRepository;
    private final BookDetailRepository bookDetailRepository;

    public void borrowBook(Long bookDetailId, User user) {
        BookDetail bookDetail = bookDetailRepository.findById(bookDetailId)
            .orElseThrow(() -> new NoSuchElementException("id가 잘못되었습니다."));

        if (user.getBorrowCount() >= 5) {
            throw new IllegalStateException("5권 이상 빌릴 수 없습니다.");
        }

        if (bookDetail.isReserveStatus()) {
            throw new IllegalStateException("현재 예약 중인 도서입니다");
        }

        if (bookDetail.isBorrowStatus()) {
            throw new IllegalStateException("현재 대출 중인 도서입니다");
        }

        BookBorrow bookBorrow = BookBorrow.builder()
            .borrowDate(LocalDate.now())
            .extendCount(0)
            .userId(user.getId())
            .bookDetailId(bookDetailId)
            .dueDate(LocalDate.now().plusDays(15))
            .build();
        bookBorrowRepository.save(bookBorrow);
        //Todo 예약한 책이면 빌릴 수 없음, 단 자신이면 가능
        //Todo 예약한 책을 빌릴 때 예약 목록에서 제거
        bookDetail.setBorrowStatus(true);
        user.setIsBorrow(true);
        user.setBorrowCount(user.getBorrowCount() + 1);
    }

    public void returnBook(Long bookDetailId, User user) {
        BookBorrow bookBorrow = bookBorrowRepository
            .findCurrentlyBorrowedBookListByBookDetailIdAndUserId(user.getId(), bookDetailId)
            .orElseThrow(() -> new NoSuchElementException("대출중인 도서가 아닙니다"));

        BookDetail bookDetail = bookDetailRepository.findById(bookDetailId)
            .orElseThrow(() -> new NoSuchElementException("id가 잘못되었습니다."));

        bookBorrow.setReturnDate(LocalDate.now());
        bookDetail.setBorrowStatus(false);
        int userBorrowCount = user.getBorrowCount() - 1;
        if (userBorrowCount == 0){
            user.setIsBorrow(false);
        }
    }
}
