package sigma.chackcheck.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import sigma.chackcheck.domain.book.domain.BookDetail;
import sigma.chackcheck.domain.book.repository.BookDetailRepository;
import sigma.chackcheck.domain.bookBorrow.domain.BookBorrow;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class BookRentInfoResponse {
    private Long bookRentId;
    private Long bookDetailId;
    private String title;
    private LocalDate borrowDate;
    private LocalDate returnDate;

    public static BookRentInfoResponse from(BookBorrow borrow, String title) {
        return new BookRentInfoResponse(
                borrow.getId(),
                borrow.getBookDetailId(),
                title,
                borrow.getBorrowDate(),
                borrow.getReturnDate()
        );
    }

    public BookRentInfoResponse(BookBorrow borrow, BookDetail bookDetail) {
        this.bookRentId = borrow.getId();
        this.bookDetailId = borrow.getBookDetailId();
        this.title = bookDetail.getTitle();
        this.borrowDate = borrow.getBorrowDate();
        this.returnDate = borrow.getReturnDate();
    }
}
