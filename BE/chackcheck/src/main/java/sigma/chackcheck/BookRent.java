package sigma.chackcheck;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class BookRent {
    @Id
    private Long id;
    // 대출 일자
    private LocalDate borrowDate;
    // 반납 일자
    private LocalDate returnDate;
    // 대출 연장 횟수
    private Integer extendCount;
}
