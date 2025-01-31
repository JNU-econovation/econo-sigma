package sigma.chackcheck.domain.book.dto.response;

import static lombok.AccessLevel.PROTECTED;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sigma.chackcheck.common.dto.PageInfo;

@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class BookApprovePageResponse {
    private PageInfo pageInfo;
    @JsonProperty("bookApproveInfos")
    private List<BookApproveDTO> bookApproveDTOList;

    public static BookApprovePageResponse of(PageInfo pageInfo, List<BookApproveDTO> bookApproveDTOList){
        return BookApprovePageResponse.builder()
            .pageInfo(pageInfo)
            .bookApproveDTOList(bookApproveDTOList)
            .build();
    }
}
