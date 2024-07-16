package sigma.chackcheck.domain.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import sigma.chackcheck.common.presentation.ApiResponse;
import sigma.chackcheck.common.presentation.ApiResponseBody.SuccessBody;
import sigma.chackcheck.common.presentation.ApiResponseGenerator;
import sigma.chackcheck.common.presentation.SuccessMessage;
import sigma.chackcheck.domain.user.domain.User;
import sigma.chackcheck.domain.user.dto.request.AddUserRequest;
import sigma.chackcheck.domain.user.dto.request.UpdatePasswordRequest;
import sigma.chackcheck.domain.user.dto.response.UserResponse;
import sigma.chackcheck.domain.user.service.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    // 회원조회
    @GetMapping("/users")
    public ApiResponse<SuccessBody<UserResponse>> findUser(@AuthenticationPrincipal User user) {
        UserResponse userResponse = new UserResponse(user);
        return ApiResponseGenerator.success(userResponse, HttpStatus.OK, SuccessMessage.GET);
    }

    // 회원가입 (임시)
    @PostMapping("/users")
    public ApiResponse<SuccessBody<Void>> signup(@RequestBody AddUserRequest request) {
        userService.save(request);
        return ApiResponseGenerator.success(HttpStatus.CREATED, SuccessMessage.CREATE);
    }

    @PutMapping("/users/update-password")
    public ApiResponse<SuccessBody<Void>> updatePassword(@RequestBody UpdatePasswordRequest request) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.updatePassword(userDetails.getUsername(), request.getNewPassword());
        return ApiResponseGenerator.success(HttpStatus.CREATED, SuccessMessage.UPDATE);
    }
}
