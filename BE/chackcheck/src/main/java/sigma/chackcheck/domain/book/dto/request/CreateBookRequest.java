package sigma.chackcheck.domain.book.dto.request;

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
public class CreateBookRequest {
    @JsonProperty("bookApproveInfos")
    private List<CreateBookRequestDTO> createBookRequestDTOList;
}
