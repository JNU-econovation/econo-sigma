package sigma.chackcheck.domain.book.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import sigma.chackcheck.common.dto.PageInfo;
import sigma.chackcheck.common.presentation.ApiResponse;
import sigma.chackcheck.common.presentation.ApiResponseBody.SuccessBody;
import sigma.chackcheck.common.presentation.ApiResponseGenerator;
import sigma.chackcheck.common.presentation.SuccessMessage;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.dto.response.BookDTO;
import sigma.chackcheck.domain.book.dto.response.BookPageResponse;
import sigma.chackcheck.domain.book.service.BookService;

@Controller
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping("/books")
    public ApiResponse<SuccessBody<BookPageResponse>> getMainPage(
        @RequestParam(value = "page", defaultValue = "0") int page) {

        Page<Book> bookList = bookService.getBookPage(page);

        PageInfo pageInfo =  PageInfo.of(page, bookList.getTotalElements(), bookList.getTotalPages());

        List<BookDTO> bookDtoList = bookList.getContent().stream()
            .map(BookDTO::of)
            .toList();

        BookPageResponse bookPageResponse = BookPageResponse.builder()
            .pageInfo(pageInfo)
            .bookDtoList(bookDtoList)
            .build();

        return ApiResponseGenerator.success(bookPageResponse, HttpStatus.OK, SuccessMessage.CREATE);
    }
}
