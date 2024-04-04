package sigma.chackcheck.common.presentation;

public enum SuccessMessage {
    CREATE("생성 성공"),
    GET_BOOK("도서 조회 성공"),
    GET_BOOK_DETAIL("도서 상세 조회 성공"),
    UPDATE("수정 성공"),
    DELETE("삭제 성공");
    private final String message;

    SuccessMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
