package sigma.chackcheck.domain.bookBorrow.dto.response;


import static lombok.AccessLevel.PROTECTED;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class BookBorrowResponse {
    private Long bookDetailId;
    private boolean borrowAvailable;
}
