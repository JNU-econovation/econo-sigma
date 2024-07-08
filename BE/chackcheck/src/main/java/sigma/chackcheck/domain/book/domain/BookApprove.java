package sigma.chackcheck.domain.book.domain;

import static jakarta.persistence.FetchType.LAZY;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookApprove {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String publishYear;
    // 출판사
    private String publisher;
    // 도서 이미지
    private String imageURL;
    // 도서 관련 정보
    private String information;
    private String categories;


    @Column(name = "user_id")
    private Long userId;

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    @AllArgsConstructor
    @Builder
    public static class BookWithCategories{
        private Book book;
        private String categories;
    }

    public static BookWithCategories toBookWithCategories(Book book, String categories){
        return BookWithCategories.builder()
            .book(book)
            .categories(categories)
            .build();
    }

    public static Book toBook(BookApprove bookApprove){
        return Book.builder()
            .title(bookApprove.getTitle())
            .author(bookApprove.getAuthor())
            .publishYear(bookApprove.getPublishYear())
            .publisher(bookApprove.getPublisher())
            .borrowCount(0)
            .imageURL(bookApprove.getImageURL())
            .information(bookApprove.getInformation())
            .build();
    }

    public static BookDetail toBookDetail(Book book){
        return BookDetail.builder()
            .title(book.getTitle())
            .borrowStatus(false)
            .reserveStatus(false)
            .book(book)
            .build();
    }
}
