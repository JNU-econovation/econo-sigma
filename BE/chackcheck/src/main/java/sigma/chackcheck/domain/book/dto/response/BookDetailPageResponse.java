package sigma.chackcheck.domain.book.dto.response;

import static lombok.AccessLevel.PROTECTED;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class BookDetailPageResponse {
    @JsonProperty("bookInfo")
    private FullBookDTO fullBookDTO;
    @JsonProperty("borrowInfos")
    private List<BookDetailDTO> bookDetailDTOList;

    public static BookDetailPageResponse of(FullBookDTO fullBookDTO, List<BookDetailDTO> bookDetailDTOList){
        return BookDetailPageResponse.builder()
            .fullBookDTO(fullBookDTO)
            .bookDetailDTOList(bookDetailDTOList)
            .build();
    }
}
