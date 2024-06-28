package sigma.chackcheck.domain.book.domain;

import static jakarta.persistence.FetchType.*;

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

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "book_id")
    private Book book;
}
