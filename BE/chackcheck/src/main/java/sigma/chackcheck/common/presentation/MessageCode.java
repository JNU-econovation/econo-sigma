package sigma.chackcheck.common.presentation;

public enum MessageCode {
    CREATE("201", "생성 성공"),
    GET_BOOK("200", "도서 조회 성공"),
    GET_BOOK_DETAIL("200","도서 상세 조회 성공"),
    UPDATE("200", "수정 성공"),
    DELETE("200", "삭제 성공");
    private final String code;
    private final String message;

    MessageCode(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
