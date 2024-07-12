package sigma.chackcheck.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import sigma.chackcheck.auth.domain.RefreshToken;
import sigma.chackcheck.auth.repository.RefreshTokenRepository;
import sigma.chackcheck.common.config.jwt.TokenProvider;
import sigma.chackcheck.common.presentation.ApiResponseGenerator;
import sigma.chackcheck.common.presentation.SuccessMessage;
import sigma.chackcheck.common.util.CookieUtil;
import sigma.chackcheck.domain.user.domain.User;

import java.io.IOException;
import java.time.Duration;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessJWTProvideHandler extends SimpleUrlAuthenticationSuccessHandler {

    public static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
    public static final Duration REFRESH_TOKEN_DURATION = Duration.ofDays(14);
    public static final Duration ACCESS_TOKEN_DURATION = Duration.ofHours(2);

    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        log.info("loginId: {}", userDetails.getUsername());

        // JWT 토큰 생성
        User user = (User) authentication.getPrincipal();
        String accessToken = tokenProvider.generateToken(user, ACCESS_TOKEN_DURATION);
        String refreshToken = tokenProvider.generateToken(user, REFRESH_TOKEN_DURATION);

        // RefreshToken 을 DB에 저장
        saveRefreshToken(user.getId(), refreshToken);
        addRefreshTokenToCookie(request, response, refreshToken);

        // SecurityContext에 인증 객체 설정
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // JSON 응답 생성
        String jsonResponse = objectMapper.writeValueAsString(
                ApiResponseGenerator.success(HttpStatus.OK, SuccessMessage.LOGIN).getBody()
        );

        // JWT 토큰을 응답으로 반환
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.getWriter().write(jsonResponse);
    }

    private void saveRefreshToken(Long userId, String newRefreshToken) {
        RefreshToken refreshToken = refreshTokenRepository.findByUserId(userId)
                .map(entity -> entity.update(newRefreshToken))
                .orElse(new RefreshToken(userId, newRefreshToken));

        refreshTokenRepository.save(refreshToken);
    }

    private void addRefreshTokenToCookie(HttpServletRequest request, HttpServletResponse response, String refreshToken) {
        int cookieMaxAge = (int) REFRESH_TOKEN_DURATION.toSeconds();

        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN_COOKIE_NAME);
        CookieUtil.addCookie(response, REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieMaxAge);
    }
}
