package sigma.chackcheck.domain.bookBorrow;

import jakarta.persistence.*;
import lombok.*;
import sigma.chackcheck.domain.bookReserve.BookReserve;
import sigma.chackcheck.domain.user.User;
import sigma.chackcheck.domain.bookDetail.BookDetail;

import java.time.LocalDate;

import static jakarta.persistence.FetchType.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookBorrow {
    @Id
    private Long id;
    // 대출 일자
    private LocalDate borrowDate;
    // 반납 일자
    private LocalDate returnDate;
    // 대출 연장 횟수
    private Integer extendCount;

    // 유저 다대일 ***
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    // 도서 예약 일대일
    @OneToOne(mappedBy = "bookBorrow")
    private BookReserve bookReserve;
    // 도서 정보 다대일 ***
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "bookDetail_id")
    private BookDetail bookDetail;
}
