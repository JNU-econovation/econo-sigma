package sigma.chackcheck.domain.bookBorrow.dto.response;

import static lombok.AccessLevel.PROTECTED;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class BookBorrowAvailableDTO {
    private boolean isAvailable;
    private Long bookDetailId;
    @JsonProperty("borrowInfo")
    private BookBorrowDTO bookBorrowDTO;

    public static BookBorrowAvailableDTO of(
        boolean isAvailable, Long bookDetailId, BookBorrowDTO bookBorrowDTO) {
        return BookBorrowAvailableDTO.builder()
            .isAvailable(isAvailable)
            .bookDetailId(bookDetailId)
            .bookBorrowDTO(bookBorrowDTO)
            .build();
    }
}
