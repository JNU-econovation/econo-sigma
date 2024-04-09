package sigma.chackcheck.domain.bookBorrow;

import jakarta.persistence.*;
import lombok.*;
import sigma.chackcheck.domain.user.User;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookReserve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 유저 다대일
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    // 도서 대출/반납 일대일
    @OneToOne
    @JoinColumn(name = "bookBorrow_id")
    private BookBorrow bookBorrow;
}
