package sigma.chackcheck.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import sigma.chackcheck.common.config.jwt.TokenProvider;
import sigma.chackcheck.common.presentation.ApiResponseGenerator;
import sigma.chackcheck.common.presentation.SuccessMessage;
import sigma.chackcheck.domain.user.domain.User;

import java.io.IOException;
import java.time.Duration;

@Slf4j
@RequiredArgsConstructor
public class LoginSuccessJWTProvideHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;
    private final ObjectMapper objectMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        log.info("loginId: {}", userDetails.getUsername());

        // JWT 토큰 생성
        User user = (User) authentication.getPrincipal();
        String token = tokenProvider.generateToken(user, Duration.ofHours(2));

        // JSON 응답 생성
        String jsonResponse = objectMapper.writeValueAsString(
                ApiResponseGenerator.success(token, HttpStatus.OK, SuccessMessage.LOGIN).getBody()
        );

        // JWT 토큰을 응답으로 반환
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(jsonResponse);
    }
}
