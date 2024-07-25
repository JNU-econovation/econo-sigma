package sigma.chackcheck.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sigma.chackcheck.common.pagination.PagePolicy;
import sigma.chackcheck.domain.book.domain.BookDetail;
import sigma.chackcheck.domain.book.repository.BookDetailRepository;
import sigma.chackcheck.domain.bookBorrow.domain.BookBorrow;
import sigma.chackcheck.domain.bookBorrow.repository.BookBorrowRepository;
import sigma.chackcheck.domain.user.domain.User;
import sigma.chackcheck.domain.user.dto.request.AddUserRequest;
import sigma.chackcheck.domain.user.dto.response.BookRentInfoResponse;
import sigma.chackcheck.domain.user.dto.response.BookRentInfosResponse;
import sigma.chackcheck.domain.user.repository.UserRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
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
                .name(dto.getName())
                .grade(dto.getGrade())
                .build()).getId();
    }

    public Page<User> getUserPage(int page){
        Pageable pageable = PageRequest.of(page, 8);
        return userRepository.findAll(pageable);
    }

    public void updatePassword(String loginId, String newPassword) {
        User user = userRepository.findByLoginId(loginId)
                .orElseThrow(() -> new IllegalArgumentException("Unexpected user"));

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
