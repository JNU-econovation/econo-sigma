package sigma.chackcheck.domain.book.dto.response;

import static lombok.AccessLevel.PROTECTED;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sigma.chackcheck.domain.book.domain.BookDetail;
import sigma.chackcheck.domain.bookBorrow.dto.response.BookBorrowDTO;

@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class BookDetailDTO {
    private boolean isAvailable;
    private Long bookDetailId;
    @JsonProperty("borrowInfo")
    private BookBorrowDTO bookBorrowDTO;

    public static BookDetailDTO of(BookDetail bookDetail, BookBorrowDTO bookBorrowDTO){
        return BookDetailDTO.builder()
            .isAvailable(!bookDetail.isBorrowStatus())
            .bookDetailId(bookDetail.getId())
            .bookBorrowDTO(bookBorrowDTO)
            .build();
    }
}
