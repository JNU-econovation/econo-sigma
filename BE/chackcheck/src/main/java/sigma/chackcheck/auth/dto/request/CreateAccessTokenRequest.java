package sigma.chackcheck.auth.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateAccessTokenRequest {
    private String RefreshToken;
}
