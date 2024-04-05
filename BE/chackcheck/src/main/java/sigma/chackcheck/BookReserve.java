package sigma.chackcheck;

import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.FetchType.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookReserve {
    @Id
    private Long id;

    // 유저 다대일 ***
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    // 도서 대출/반납 일대일 ***
    @OneToOne
    @JoinColumn(name = "bookBorrow_id")
    private BookBorrow bookBorrow;
}
