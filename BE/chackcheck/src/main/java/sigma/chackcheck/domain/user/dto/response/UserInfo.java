package sigma.chackcheck.domain.user.dto.response;

import static lombok.AccessLevel.PROTECTED;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class UserInfo {
    private Long userId;
    private String userName;
    private CurruentBorrowedBooks curruentBorrowedBooks;
    private boolean penaltyStatus;
}
