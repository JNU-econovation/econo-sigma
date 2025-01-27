package sigma.chackcheck.domain.book.dto.response;

import static lombok.AccessLevel.PROTECTED;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import sigma.chackcheck.domain.book.domain.Book;

@Getter
@SuperBuilder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class FullBookDTO extends BookDTO{
    private String publishYear;
    private String information;

    public static FullBookDTO of(Book book){
        return FullBookDTO.builder()
            .id(book.getId())
            .title(book.getTitle())
            .author(book.getAuthor())
            .publisher(book.getPublisher())
            .publishYear(book.getPublishYear())
            .information(book.getInformation())
            .imageURL(book.getImageURL())
            .build();
    }
}
