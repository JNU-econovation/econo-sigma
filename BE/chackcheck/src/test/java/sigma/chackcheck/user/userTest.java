package sigma.chackcheck.user;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.GrantedAuthority;
import sigma.chackcheck.domain.user.domain.Role;
import sigma.chackcheck.domain.user.domain.User;

import java.util.Collection;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class userTest {

    @Test
    @DisplayName("testGetAuthorities(): 유저 권한을 확인한다.")
    public void testGetAuthorities() {
        // given
        User user = User.builder()
                .loginId("test2")
                .password("1234")
                .role(Role.ROLE_USER)
                .build();

        // when
        Collection<? extends GrantedAuthority> authorities = user.getAuthorities();

        // then
        assertEquals(1, authorities.size());
        assertTrue(authorities.stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_USER")));
    }

}
