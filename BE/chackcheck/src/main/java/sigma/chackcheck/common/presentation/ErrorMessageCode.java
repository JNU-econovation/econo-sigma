package sigma.chackcheck.common.presentation;

// Error code
public enum ErrorMessageCode {
    RENTED_BOOK("1001", "이미 대출중인 도서 입니다.");
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
