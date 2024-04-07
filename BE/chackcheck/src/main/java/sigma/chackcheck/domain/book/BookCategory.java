package sigma.chackcheck.domain.book;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookCategory {
    @Id
    private Long id;

    // 도서 다대일
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
    // 카테고리 다대일
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
