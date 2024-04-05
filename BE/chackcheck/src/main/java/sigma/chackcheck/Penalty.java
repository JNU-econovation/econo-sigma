package sigma.chackcheck;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.*;

import java.time.LocalDate;

import static jakarta.persistence.FetchType.*;

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

    // 유저 일대일 ***
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
