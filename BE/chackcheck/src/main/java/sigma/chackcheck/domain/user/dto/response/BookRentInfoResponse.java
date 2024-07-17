package sigma.chackcheck.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
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
}
