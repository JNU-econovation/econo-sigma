package sigma.chackcheck.common.presentation;

// Error code
public enum ErrorMessageCode {
    INVALID_BOOK("1000", "존재하지 않는 도서입니다."),
    INVALID_CATEGORY("1001", "존재하지 않는 카테고리입니다.");
    private final String code;
    private final String message;

    ErrorMessageCode(String code, String message) {
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
