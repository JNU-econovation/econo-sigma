package sigma.chackcheck.domain.user.domain;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String loginId;
    private String password;
    private String name;
    // 기수
    private Integer grade;
    // 대출 유무
    private Boolean isBorrow;
    // 예약 유무
    private Boolean isReserve;
    // 대출 도서 개수
    private Integer borrowCount;
    // 예약 도서 개수
    private Integer reserveCount;
    // 권한
    @Enumerated(EnumType.STRING)
    private Role role;
}
