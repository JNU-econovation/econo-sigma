package sigma.chackcheck.common.pagination.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import sigma.chackcheck.common.pagination.PagePolicy;

public interface Pagination<T> {

    Page<T> getBookPage(int page);

    // 페이지네이션 정책을 정의하는 default 메서드
    default Pageable createDefaultPageRequest(int page, PagePolicy pagePolicy) {
        return PageRequest.of(page, pagePolicy.pageSize);
    }
}
