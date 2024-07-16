package sigma.chackcheck.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import sigma.chackcheck.domain.user.domain.User;
import sigma.chackcheck.domain.user.dto.request.AddUserRequest;
import sigma.chackcheck.domain.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User findById(Long Id) {
        return userRepository.findById(Id)
                .orElseThrow(() -> new IllegalArgumentException("not found: " + Id));
    }

    public Long save(AddUserRequest dto) {
        return userRepository.save(User.builder()
                .loginId(dto.getLoginId())
                .password(passwordEncoder.encode(dto.getPassword()))
                .build()).getId();
    }

    public void updatePassword(String loginId, String newPassword) {
        User user = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
