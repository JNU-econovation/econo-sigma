package sigma.chackcheck.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.Customizer;

@EnableWebSecurity
@Configuration
public class SecurityWebConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
            .httpBasic(Customizer.withDefaults()) // 기본 HTTP Basic 인증 설정을 사용합니다.
            .csrf(AbstractHttpConfigurer::disable) // CSRF 보호를 비활성화합니다.
            .cors(Customizer.withDefaults()) // 기본 CORS 설정을 사용합니다.
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/**").permitAll() // 모든 요청을 허용합니다.
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 관리를 상태 비저장 방식으로 설정합니다.
            );
        // .addFilterBefore(new JwtTokenFilter(userService, secretKey), UsernamePasswordAuthenticationFilter.class); // UserNamePasswordAuthenticationFilter적용하기 전에 JWTTokenFilter를 적용 하라는 뜻 입니다.

        return httpSecurity.build();
    }
}
