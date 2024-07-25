package sigma.chackcheck.domain.bookBorrow.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sigma.chackcheck.common.service.GetEntityUsecase;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.repository.BookApproveRepository;
import sigma.chackcheck.domain.book.repository.BookCategoryRepository;
import sigma.chackcheck.domain.book.repository.BookRepository;
import sigma.chackcheck.domain.bookBorrow.domain.BookBorrow;
import sigma.chackcheck.domain.bookBorrow.repository.BookBorrowRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class GetBookBorrow implements GetEntityUsecase<BookBorrow> {

    private final BookBorrowRepository bookBorrowRepository;

    @Override
    public BookBorrow getOneEntity(Long id) {
        return bookBorrowRepository.findById(id).orElseThrow(
            () -> new IllegalArgumentException("대여 책이 없어용"));
    }

    @Override
    public List<BookBorrow> getAllEntities() {
        return bookBorrowRepository.findAll();
    }

    public Optional<BookBorrow> getCurrentlyBorrowedBookListByBookDetailId(Long id){
        return bookBorrowRepository.findCurrentlyBorrowedBookListByBookDetailId(id);
    }
}
