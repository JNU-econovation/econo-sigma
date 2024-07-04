package sigma.chackcheck.domain.bookBorrow.dto.response;

import static lombok.AccessLevel.PROTECTED;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sigma.chackcheck.domain.bookBorrow.domain.BookBorrow;

@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class BookBorrowDTO {
    private Long bookBorrowId;
    private String member;
    private LocalDate dueDate;

    public static BookBorrowDTO of (BookBorrow bookBorrow, String member, LocalDate dueDate){
        return BookBorrowDTO.builder()
            .bookBorrowId(bookBorrow.getId())
            .member(member)
            .dueDate(dueDate)
            .build();
    }
}
