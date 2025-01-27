package sigma.chackcheck.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import sigma.chackcheck.common.dto.PageInfo;

import java.util.List;

@Getter
@AllArgsConstructor
public class BookRentInfosResponse {
    private PageInfo pageInfo;
    private List<BookRentInfoResponse> bookRentInfos;

    public static BookRentInfosResponse of(PageInfo pageInfo, List<BookRentInfoResponse> bookRentInfos) {
        return new BookRentInfosResponse(pageInfo, bookRentInfos);
    }
}
