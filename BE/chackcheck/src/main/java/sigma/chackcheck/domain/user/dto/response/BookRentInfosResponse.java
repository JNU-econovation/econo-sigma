package sigma.chackcheck.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class BookRentInfosResponse {
    private List<BookRentInfoResponse> bookRentInfos;
}
