package sigma.chackcheck.domain.user.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sigma.chackcheck.common.pagination.PagePolicy;
import sigma.chackcheck.domain.bookBorrow.domain.BookBorrow;
import sigma.chackcheck.domain.bookBorrow.repository.BookBorrowRepository;
import sigma.chackcheck.domain.book.domain.BookDetail;
import sigma.chackcheck.domain.book.repository.BookDetailRepository;
import sigma.chackcheck.domain.user.dto.response.BookRentInfoResponse;
import sigma.chackcheck.domain.user.dto.response.BookRentInfosResponse;
import sigma.chackcheck.common.dto.PageInfo;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserBorrowHistoryService {

    private final BookBorrowRepository bookBorrowRepository;
    private final BookDetailRepository bookDetailRepository;

    // 도서 대출 조회 (전체)
    public BookRentInfosResponse getBorrowHistory(Long userId, int page) {
        Pageable pageable = createDefaultPageRequest(page, PagePolicy.DEFAULT_PAGE);
        Page<BookBorrow> borrowHistoryPage = bookBorrowRepository.findByUserId(userId, pageable);
        List<BookRentInfoResponse> bookRentInfos = convertToResponseList(borrowHistoryPage);

        PageInfo pageInfo = PageInfo.of(page, borrowHistoryPage.getTotalElements(), borrowHistoryPage.getTotalPages());
        return new BookRentInfosResponse(pageInfo, bookRentInfos);
    }

    private Pageable createDefaultPageRequest(int page, PagePolicy pagePolicy) {
        return PageRequest.of(page, pagePolicy.pageSize);
    }

    private List<BookRentInfoResponse> convertToResponseList(Page<BookBorrow> borrowHistoryPage) {
        return borrowHistoryPage.getContent().stream()
                .map(borrow -> {
                    BookDetail bookDetail = bookDetailRepository.findById(borrow.getBookDetailId())
                            .orElseThrow(() -> new IllegalArgumentException("Invalid book detail ID"));
                    return BookRentInfoResponse.from(borrow, bookDetail.getTitle());
                })
                .collect(Collectors.toList());
    }

    // 도서 대출 조회 (현재)
    public List<BookRentInfoResponse> getCurrentBorrowHistory(Long userId) {
        List<BookBorrow> currentBorrowList = bookBorrowRepository.findCurrentlyBorrowedBookListByUserId(userId);
        return currentBorrowList.stream()
                .map(this::toBookRentInfoResponse)
                .collect(Collectors.toList());
    }

    private BookRentInfoResponse toBookRentInfoResponse(BookBorrow borrow) {
        BookDetail bookDetail = bookDetailRepository.findById(borrow.getBookDetailId())
                .orElseThrow(() -> new IllegalArgumentException("Invalid book detail ID"));
        return new BookRentInfoResponse(borrow, bookDetail);
    }
}
