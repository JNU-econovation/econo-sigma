package sigma.chackcheck.common.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import sigma.chackcheck.common.pagination.PagePolicy;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.domain.BookApprove;

public interface Pagination<T> {
    // todo: type으로 지정해놓고 이름 저따구로한거 고치기
    Page<T> getBookPage(int page);
    Page<T> getBookPageByCategoryName(String categoryName, int page);
    Page<T> getBookPageBySearch(String keyword, int page);
    Page<BookApprove> getBookApprovePage(int page);

    // 페이지네이션 정책을 정의하는 default 메서드
    default Pageable createDefaultPageRequest(int page, PagePolicy pagePolicy) {
        return PageRequest.of(page, pagePolicy.pageSize);
    }
}
