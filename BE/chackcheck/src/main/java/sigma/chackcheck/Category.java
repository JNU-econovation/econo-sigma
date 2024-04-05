package sigma.chackcheck;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Category {
    @Id
    private Long id;

    // 도서_카테고리 다대일
    @OneToMany(mappedBy = "category")
    private List<BookCategory> bookCategory;
}
