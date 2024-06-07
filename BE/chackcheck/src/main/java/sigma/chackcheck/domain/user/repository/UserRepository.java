package sigma.chackcheck.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sigma.chackcheck.domain.user.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByLoginId(String loginId);
}
