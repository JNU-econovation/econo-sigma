package sigma.chackcheck.domain.bookBorrow.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookBorrow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // 대출 일자
    private LocalDate borrowDate;
    // 반납 일자
    private LocalDate returnDate;
    // 대출 연장 횟수
    private Integer extendCount;

    // 유저 다대일
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
    @Column(name = "user_id")
    private Long userId;
    // 도서 정보 다대일
//    @ManyToOne
//    @JoinColumn(name = "bookDetail_id")
//    private BookDetail bookDetail;
    @Column(name = "bookDetail_id")
    private Long bookDetailId;
}