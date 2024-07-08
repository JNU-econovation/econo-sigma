package sigma.chackcheck.domain.book.dto.request;

import static lombok.AccessLevel.PROTECTED;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import sigma.chackcheck.domain.book.domain.BookApprove;

@Getter
@Builder
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
public class CreateBookApproveRequest {
    private String title;
    private String author;
    private String publisher;
    private String publishYear;
    private String categories;
    private String imageURL;
    private String information;
    private Long userId;

    public static BookApprove toEntity(CreateBookApproveRequest createBookApproveRequest){
        return BookApprove.builder()
            .title(createBookApproveRequest.getTitle())
            .author(createBookApproveRequest.getAuthor())
            .publisher(createBookApproveRequest.getPublisher())
            .publishYear(createBookApproveRequest.getPublishYear())
            .categories(createBookApproveRequest.getCategories())
            .imageURL(createBookApproveRequest.getImageURL())
            .information(createBookApproveRequest.getInformation())
            .userId(createBookApproveRequest.getUserId())
            .build();
    }
}
