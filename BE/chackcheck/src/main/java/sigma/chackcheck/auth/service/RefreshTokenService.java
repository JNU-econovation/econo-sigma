package sigma.chackcheck.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sigma.chackcheck.auth.domain.RefreshToken;
import sigma.chackcheck.auth.repository.RefreshTokenRepository;

@RequiredArgsConstructor
@Service
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken findByRefreshToken(String refreshToken) {
        return refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected token"));
    }
}
