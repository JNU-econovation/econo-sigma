package sigma.chackcheck.auth.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;
import sigma.chackcheck.auth.repository.RefreshTokenRepository;
import sigma.chackcheck.common.util.CookieUtil;
import sigma.chackcheck.domain.user.domain.User;

@RequiredArgsConstructor
@Component
public class CustomLogoutHandler implements LogoutHandler {

    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

        // 쿠키 삭제
        CookieUtil.deleteCookie(request, response, LoginSuccessJWTProvideHandler.REFRESH_TOKEN_COOKIE_NAME);

        // DB에서 refresh token 삭제
        if (authentication != null) {

            Object principal = authentication.getPrincipal();

            if (principal instanceof User) {
                User user = (User) principal;
                refreshTokenRepository.deleteRefreshTokenByUserId(user.getId());
            } else if (principal instanceof UserDetails) {
                UserDetails userDetails = (UserDetails) principal;
                if (userDetails instanceof User) {
                    User user = (User) userDetails;
                    refreshTokenRepository.deleteRefreshTokenByUserId(user.getId());
                }
            }
        }
    }
}
