package sigma.chackcheck.domain.user.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddUserRequest {
    private String loginId;
    private String password;
    private String name;
    private int grade;
}
