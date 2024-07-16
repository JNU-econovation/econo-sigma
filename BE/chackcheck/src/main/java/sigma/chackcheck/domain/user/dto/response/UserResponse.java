package sigma.chackcheck.domain.user.dto.response;

import lombok.Getter;
import sigma.chackcheck.domain.user.domain.User;

@Getter
public class UserResponse {

    private final String name;
    private final Integer grade;
    private final String loginId; // loginId -> 학번

    public UserResponse(User user) {
        this.name = user.getName();
        this.grade = user.getGrade();
        this.loginId = user.getLoginId();
    }
}
