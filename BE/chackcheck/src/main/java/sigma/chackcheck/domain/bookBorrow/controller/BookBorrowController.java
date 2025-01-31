package sigma.chackcheck.domain.bookBorrow.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import sigma.chackcheck.common.presentation.ApiResponse;
import sigma.chackcheck.common.presentation.ApiResponseBody.SuccessBody;
import sigma.chackcheck.common.presentation.ApiResponseGenerator;
import sigma.chackcheck.common.presentation.SuccessMessage;
import sigma.chackcheck.domain.bookBorrow.service.BookBorrowService;
import sigma.chackcheck.domain.user.domain.User;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class BookBorrowController {
    private final BookBorrowService bookBorrowService;

    @PutMapping("/books/{bookDetailId}/borrow")
    public ApiResponse<SuccessBody<Void>> borrowBook(
        @PathVariable("bookDetailId") Long bookDetailId,
        @AuthenticationPrincipal User user
    ){
        bookBorrowService.borrowBook(bookDetailId, user);
        return ApiResponseGenerator.success(HttpStatus.ACCEPTED, SuccessMessage.UPDATE);
    }
    @PutMapping("/books/{bookDetailId}/return")
    public ApiResponse<SuccessBody<Void>> returnBook(
        @PathVariable("bookDetailId") Long bookDetailId,
        @AuthenticationPrincipal User user
    ){
        bookBorrowService.returnBook(bookDetailId, user);
        return ApiResponseGenerator.success(HttpStatus.ACCEPTED, SuccessMessage.UPDATE);
    }
}
