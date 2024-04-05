package sigma.chackcheck;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;
import sigma.chackcheck.BookCategory;
import sigma.chackcheck.BookDetail;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Book {
    @Id
    private Long id;
    private String title;
    private String author;
    private String publishYear;
    // 출판사
    private String publisher;
    // 도서 빌린 횟수
    private Integer borrowCount;
    // 도서 이미지
    private String imageURL;
    // 도서 관련 정보
    private String information;

    // 도서 정보 다대일
    @OneToMany(mappedBy = "book")
    private List<BookDetail> bookDetail;
    // 도서_카테고리 일대다
    @OneToMany(mappedBy = "book")
    private List<BookCategory> bookCategory;
}
