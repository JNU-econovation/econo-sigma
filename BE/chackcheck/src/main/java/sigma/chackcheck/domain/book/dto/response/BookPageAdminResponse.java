package sigma.chackcheck.domain.book.dto.response;

import static lombok.AccessLevel.PROTECTED;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import sigma.chackcheck.common.dto.PageInfo;
import sigma.chackcheck.domain.book.domain.Book;

@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class BookPageAdminResponse {
    private PageInfo pageInfo;
    private List<BookInfoDTO> bookInfos;

    public static BookPageAdminResponse of(Page<Book> page, List<BookInfoDTO> bookInfoDTOs) {
        PageInfo pageInfo = new PageInfo(page.getNumber(), page.getTotalElements(), page.getTotalPages());
        return new BookPageAdminResponse(pageInfo, bookInfoDTOs);
    }
}
