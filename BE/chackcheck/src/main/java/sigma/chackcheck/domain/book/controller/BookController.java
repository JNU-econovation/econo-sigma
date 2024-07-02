package sigma.chackcheck.domain.book.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import sigma.chackcheck.common.dto.PageInfo;
import sigma.chackcheck.common.presentation.ApiResponse;
import sigma.chackcheck.common.presentation.ApiResponseBody.SuccessBody;
import sigma.chackcheck.common.presentation.ApiResponseGenerator;
import sigma.chackcheck.common.presentation.SuccessMessage;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.domain.BookApprove;
import sigma.chackcheck.domain.book.domain.BookDetail;
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
public class BookController {

    private final BookService bookService;
    private final BookBorrowService bookBorrowService;
    private final UserService userService;

    @GetMapping("/books/all")
    public ApiResponse<SuccessBody<BookPageResponse>> getMainPage(
        @RequestParam(value = "page", defaultValue = "0") int page) {

        Page<Book> bookList = bookService.getBookPage(page);

        return getBookSuccessBodyApiResponse(page, bookList);
    }

    @GetMapping("/books/category")
    public ApiResponse<SuccessBody<BookPageResponse>> getBooksByCategoryName(
        @RequestParam(value = "categoryName") String categoryName,
        @RequestParam(value = "page", defaultValue = "0") int page
    ){
        Page<Book> bookList = bookService.getBookPageByCategoryName(categoryName, page);

        return getBookSuccessBodyApiResponse(page, bookList);
    }

    @GetMapping("/books/all/search")
    public ApiResponse<SuccessBody<BookPageResponse>> getBooksBySearch(
        @RequestParam(value = "keyword") String keyword,
        @RequestParam(value = "page", defaultValue = "0") int page
    ){
        Page<Book> bookList = bookService.getBookPageBySearch(keyword, page);

        return getBookSuccessBodyApiResponse(page, bookList);
    }

    @GetMapping("/books/approve")
    public ApiResponse<SuccessBody<BookApprovePageResponse>> getBookApprovePage(
        @RequestParam(value = "page", defaultValue = "0") int page
    ){
        Page<BookApprove> bookApproveList = bookService.getBookApprovePage(page);

        return getBookApproveSuccessBodyApiResponse(page, bookApproveList);
    }

    @GetMapping("/books/{bookId}")
    public ApiResponse<SuccessBody<BookDetailPageResponse>> getBookDetails(
        @PathVariable(value = "bookId") Long bookId
    ){
        // TODO: 리팩토링 무조건 필요함!!
        Book book = bookService.getOneBook(bookId);
        FullBookDTO fullBookDTO = FullBookDTO.of(book);

        List<BookDetail> bookDetailList = bookService.getAllBookDetailsByBookId(bookId);
        List<BookDetailDTO> bookDetailDTOList = new ArrayList<>();

        for (BookDetail bookDetail : bookDetailList) {
            Optional<BookBorrow> optionalBookBorrow = bookBorrowService.getCurrentlyBorrowedBookListByBookDetailId(
                bookDetail.getId());
            BookBorrowDTO bookBorrowDTO = null;
            if (optionalBookBorrow.isPresent()) {
                BookBorrow bookBorrow = optionalBookBorrow.get();
                User user = userService.findById(bookBorrow.getUserId());
                // TODO: dueDate 만드는 로직 추가
                // TODO: db에 반납해야하는 기간 추가
                LocalDate dueDate = bookBorrow.getBorrowDate().plusDays(15);
                bookBorrowDTO = BookBorrowDTO.of(bookBorrow, user.getName(), dueDate);
            }
            BookDetailDTO bookDetailDTO = BookDetailDTO.of(bookDetail, bookBorrowDTO);
            bookDetailDTOList.add(bookDetailDTO);
        }

        BookDetailPageResponse bookDetailPageResponse = BookDetailPageResponse.of(fullBookDTO, bookDetailDTOList);

        return ApiResponseGenerator.success(bookDetailPageResponse, HttpStatus.OK, SuccessMessage.GET);
    }

    private ApiResponse<SuccessBody<BookPageResponse>> getBookSuccessBodyApiResponse(
        @RequestParam(value = "page", defaultValue = "0") int page,
        Page<Book> bookList) {
        PageInfo pageInfo =  PageInfo.of(page, bookList.getTotalElements(), bookList.getTotalPages());

        List<BookDTO> bookDtoList = bookList.getContent().stream()
            .map(BookDTO::of)
            .toList();

        BookPageResponse bookPageResponse = BookPageResponse.of(pageInfo, bookDtoList);

        return ApiResponseGenerator.success(bookPageResponse, HttpStatus.OK, SuccessMessage.GET);
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
