package sigma.chackcheck.domain.book.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookRegister {
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

    // 유저 다대일
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
    @Column(name = "user_id")
    private Long userId;
}
