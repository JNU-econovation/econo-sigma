package sigma.chackcheck.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sigma.chackcheck.common.config.jwt.TokenProvider;
import sigma.chackcheck.domain.user.domain.User;
import sigma.chackcheck.domain.user.service.UserService;

import java.time.Duration;

@RequiredArgsConstructor
@Service
@Transactional
public class TokenService {

    private final TokenProvider tokenProvider;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;

    public String createNewAccessToken(String refreshToken) {
        // 토큰 유효성 검사에 실패하면 예외 발생
        if (!tokenProvider.validToken(refreshToken)) {
            throw new IllegalArgumentException("Unexpected token");
        }

        Long userId = refreshTokenService.findByRefreshToken(refreshToken).getUserId();
        User user= userService.findById(userId);

        return tokenProvider.generateToken(user, Duration.ofHours(2));
    }
}
