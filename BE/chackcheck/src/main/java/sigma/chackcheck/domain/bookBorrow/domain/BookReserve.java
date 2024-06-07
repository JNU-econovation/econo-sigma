package sigma.chackcheck.domain.bookBorrow.domain;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookReserve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;
    // 도서 대출/반납 일대일

    @Column(name = "bookBorrow_id")
    private Long bookBorrowId;
}
