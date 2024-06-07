package sigma.chackcheck.domain.book.domain;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private boolean borrowStatus;
    private boolean reserveStatus;

    @Column(name = "book_id")
    private Long bookId;
}
