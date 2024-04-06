package sigma.chackcheck.domain.book;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;
import sigma.chackcheck.domain.book.BookCategory;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Category {
    @Id
    private Long id;
    private String categoryName;

    // 도서_카테고리 다대일
    @OneToMany(mappedBy = "category")
    private List<BookCategory> bookCategory;
}
