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
public class BookPageResponse {
    private PageInfo pageInfo;
    @JsonProperty("bookInfos")
    private List<BookDTO> bookDtoList;

    public static BookPageResponse of(PageInfo pageInfo, List<BookDTO> bookDtoList){
        return BookPageResponse.builder()
            .pageInfo(pageInfo)
            .bookDtoList(bookDtoList)
            .build();
    }
}