package sigma.chackcheck.domain.bookBorrow.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sigma.chackcheck.domain.bookBorrow.domain.BookBorrow;

@Service
@RequiredArgsConstructor
public class BookBorrowService {
    private final GetBookBorrow getBookBorrow;

    public BookBorrow getOneBookBorrow(Long id){
        return getBookBorrow.getOneEntity(id);
    }

    public List<BookBorrow> getAllBookBorrow(){
        return getBookBorrow.getAllEntities();
    }

    public Optional<BookBorrow> getCurrentlyBorrowedBookListByBookDetailId(Long id){
        return getBookBorrow.getCurrentlyBorrowedBookListByBookDetailId(id);
    }
}
