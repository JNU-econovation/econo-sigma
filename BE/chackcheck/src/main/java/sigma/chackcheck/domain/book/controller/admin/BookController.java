package sigma.chackcheck.domain.book.controller.admin;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import sigma.chackcheck.common.dto.PageInfo;
import sigma.chackcheck.common.presentation.ApiResponse;
import sigma.chackcheck.common.presentation.ApiResponseBody.SuccessBody;
import sigma.chackcheck.common.presentation.ApiResponseGenerator;
import sigma.chackcheck.common.presentation.SuccessMessage;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.domain.BookApprove;
import sigma.chackcheck.domain.book.domain.BookDetail;
import sigma.chackcheck.domain.book.dto.request.CreateBookApproveRequest;
import sigma.chackcheck.domain.book.dto.request.CreateBookRequest;
import sigma.chackcheck.domain.book.dto.response.BookApproveDTO;
import sigma.chackcheck.domain.book.dto.response.BookApprovePageResponse;
import sigma.chackcheck.domain.book.dto.response.BookDTO;
import sigma.chackcheck.domain.book.dto.response.BookDetailDTO;
import sigma.chackcheck.domain.book.dto.response.BookDetailPageResponse;
import sigma.chackcheck.domain.book.dto.response.BookPageResponse;
import sigma.chackcheck.domain.book.dto.response.FullBookDTO;
import sigma.chackcheck.domain.book.service.BookService;
import sigma.chackcheck.domain.bookBorrow.domain.BookBorrow;
import sigma.chackcheck.domain.bookBorrow.dto.response.BookBorrowDTO;
import sigma.chackcheck.domain.bookBorrow.service.BookBorrowService;
import sigma.chackcheck.domain.user.domain.User;
import sigma.chackcheck.domain.user.service.UserService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class BookController {

    private final BookService bookService;
    private final UserService userService;

    @GetMapping("/admin/books/approve")
    public ApiResponse<SuccessBody<BookApprovePageResponse>> getBookApprovePage(
        @RequestParam(value = "page", defaultValue = "0") int page
    ){
        Page<BookApprove> bookApproveList = bookService.getBookApprovePage(page);

        return getBookApproveSuccessBodyApiResponse(page, bookApproveList);
    }

    @PostMapping("/admin/books/approve")
    public ApiResponse<SuccessBody<Void>> approveBookApprove(@RequestBody CreateBookRequest createBookRequest){
        bookService.createBook(createBookRequest);
        return ApiResponseGenerator.success(HttpStatus.CREATED, SuccessMessage.CREATE);
    }

    private ApiResponse<SuccessBody<BookApprovePageResponse>> getBookApproveSuccessBodyApiResponse(
        @RequestParam(value = "page", defaultValue = "0") int page,
        Page<BookApprove> bookList) {
        PageInfo pageInfo =  PageInfo.of(page, bookList.getTotalElements(), bookList.getTotalPages());

        List<BookApproveDTO> bookApproveDtoList = bookList.getContent().stream()
            .map(bookApprove -> BookApproveDTO.of(bookApprove, userService.findById(bookApprove.getUserId())))
            .toList();

        BookApprovePageResponse bookApprovePageResponse = BookApprovePageResponse.of(pageInfo, bookApproveDtoList);

        return ApiResponseGenerator.success(bookApprovePageResponse, HttpStatus.OK, SuccessMessage.GET);
    }
}
