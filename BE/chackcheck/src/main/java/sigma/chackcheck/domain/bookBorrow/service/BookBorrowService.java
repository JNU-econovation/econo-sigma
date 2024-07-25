package sigma.chackcheck.domain.bookBorrow.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sigma.chackcheck.domain.book.service.PostBook;
import sigma.chackcheck.domain.bookBorrow.domain.BookBorrow;
import sigma.chackcheck.domain.bookBorrow.dto.response.BookBorrowResponse;
import sigma.chackcheck.domain.user.domain.User;

@Service
@RequiredArgsConstructor
public class BookBorrowService {
    private final GetBookBorrow getBookBorrow;
    private final PutBookBorrow putBookBorrow;

    public BookBorrow getOneBookBorrow(Long id){
        return getBookBorrow.getOneEntity(id);
    }

    public List<BookBorrow> getAllBookBorrow(){
        return getBookBorrow.getAllEntities();
    }

    public Optional<BookBorrow> getCurrentlyBorrowedBookListByBookDetailId(Long id){
        return getBookBorrow.getCurrentlyBorrowedBookListByBookDetailId(id);
    }

    public void borrowBook(Long bookDetailId, User user){
        if (!(user.getPenalty() == null ||
            user.getPenalty().getExpiryDate().isAfter(LocalDate.now()))){
            throw new IllegalStateException("현재 연체중입니다.");
        }
        putBookBorrow.borrowBook(bookDetailId, user);
    }

    public void returnBook(Long bookDetailId, User user){
        putBookBorrow.returnBook(bookDetailId, user);
    }
}
