package sigma.chackcheck.domain.book.dto.response;

import static lombok.AccessLevel.PROTECTED;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.domain.BookApprove;
import sigma.chackcheck.domain.user.domain.User;

@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class BookApproveDTO {
    private Long id;
    private String title;
    private String author;
    private String publishYear;
    private String publisher;
    private String bookApplicant;

    public static BookApproveDTO of(BookApprove bookApprove, User user){
        return BookApproveDTO.builder()
            .id(bookApprove.getId())
            .title(bookApprove.getTitle())
            .author(bookApprove.getAuthor())
            .publisher(bookApprove.getPublisher())
            .publishYear(bookApprove.getPublishYear())
            .bookApplicant(user.getName())
            .build();
    }
}
