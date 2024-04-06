package sigma.chackcheck.domain.user;

import jakarta.persistence.*;
import lombok.*;
import sigma.chackcheck.domain.bookBorrow.BookBorrow;
import sigma.chackcheck.domain.bookBorrow.BookReserve;

import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {

    @Id
    private Long id;
    private String loginId;
    private String password;
    // 기수
    private Integer grade;
    // 대출/예약 유무
    private Boolean isRentReserve;
    // 대출 도서 개수
    private Integer borrowCount;
    // 예약 도서 개수
    private Integer reserveCount;

    // 패널티 일대일
    @OneToOne(mappedBy = "user",fetch = LAZY)
    private Penalty penalty;
    // 도서 예약 일대다
    @OneToMany(mappedBy = "user")
    private List<BookReserve> bookReserveList;
    // 도서 대출 일대다
    @OneToMany(mappedBy = "user")
    private List<BookBorrow> bookBorrowList;
}
