package sigma.chackcheck.domain.book.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sigma.chackcheck.domain.book.domain.Book;
import sigma.chackcheck.domain.book.domain.BookApprove;
import sigma.chackcheck.domain.book.domain.BookCategory;
import sigma.chackcheck.domain.book.domain.BookDetail;
import sigma.chackcheck.domain.book.domain.Category;
import sigma.chackcheck.domain.book.repository.BookApproveRepository;
import sigma.chackcheck.domain.book.repository.BookCategoryRepository;
import sigma.chackcheck.domain.book.repository.BookDetailRepository;
import sigma.chackcheck.domain.book.repository.BookRepository;
import sigma.chackcheck.domain.book.repository.CategoryRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class PostBook {
    private final BookCategoryRepository bookCategoryRepository;
    private final BookApproveRepository bookApproveRepository;
    private final BookRepository bookRepository;
    private final BookDetailRepository bookDetailRepository;

    public Long saveBookCategory(BookCategory bookCategory){
        return bookCategoryRepository.save(bookCategory).getId();
    }
    public Long saveBookApprove(BookApprove bookApprove){
        return bookApproveRepository.save(bookApprove).getId();
    }

    public Long saveBook(Book book){
        return bookRepository.save(book).getId();
    }

    public Long saveBookDetail(BookDetail bookDetail){
        return bookDetailRepository.save(bookDetail).getId();
    }
}
