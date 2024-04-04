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
public class Penalty {
    @Id
    private Long id;
    // 대출/반납 제한 만료일자
    private LocalDate expiryDate;


}
