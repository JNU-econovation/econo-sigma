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
    private int totalBooks;
    private int totalPages;

    public static PageInfo of(int currentPage, int totalBooks, int totalPages){
        return PageInfo.builder()
            .currentPage(currentPage)
            .totalBooks(totalBooks)
            .totalPages(totalPages)
            .build();
    }
}
