package sigma.chackcheck.domain.book.dto.response;

import static lombok.AccessLevel.PROTECTED;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.domain.BookDetail;
import sigma.chackcheck.domain.bookBorrow.dto.response.BookBorrowDTO;

@Getter
@SuperBuilder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class BookInfoDTO {
    private String title;
    private Long bookId;
    private List<String> categories;
    private boolean borrowStatus;

    public static BookInfoDTO of(BookDetail bookDetail, List<String> categories){
        return BookInfoDTO.builder()
            .title(bookDetail.getTitle())
            .bookId(bookDetail.getId())
            .categories(categories)
            .borrowStatus(bookDetail.isBorrowStatus())
            .build();
    }
}
