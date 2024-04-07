package sigma.chackcheck.domain.book;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookDetail {
    @Id
    private Long id;

    // 도서 대다일
    @ManyToOne
    @JoinColumn(name = "bookId")
    private Book book;
}
