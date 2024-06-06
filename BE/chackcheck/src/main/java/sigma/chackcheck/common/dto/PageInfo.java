package sigma.chackcheck.common.dto;

import static lombok.AccessLevel.PROTECTED;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class PageInfo {
    private int currentPage;
    private long totalData;
    private int totalPages;

    public static PageInfo of(int currentPage, long totalData, int totalPages){
        return PageInfo.builder()
            .currentPage(currentPage)
            .totalData(totalData)
            .totalPages(totalPages)
            .build();
    }
}
