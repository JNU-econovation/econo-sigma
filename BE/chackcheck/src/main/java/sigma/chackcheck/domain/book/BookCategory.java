package sigma.chackcheck.domain.book;

import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.FetchType.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookCategory {
    @Id
    private Long id;

    // 도서 다대일 ***
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "book_id")
    private Book book;
    // 카테고리 다대일 ***
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
}
