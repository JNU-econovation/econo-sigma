package sigma.chackcheck.domain.bookBorrow.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Entity
@Getter
@Setter
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
    private LocalDate dueDate;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "bookDetail_id")
    private Long bookDetailId;
}
