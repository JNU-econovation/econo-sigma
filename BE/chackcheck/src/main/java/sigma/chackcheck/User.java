package sigma.chackcheck;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.*;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {

    @Id
    private Long id;
    private String loginId;
    private String password;
    // 기수
    private Integer grade;
    // 대출/예약 유무
    private Boolean isRentReserve;
    // 대출 도서 개수
    private Integer borrowCount;
    // 예약 도서 개수
    private Integer reserveCount;
    
}
