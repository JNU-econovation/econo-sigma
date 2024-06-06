package sigma.chackcheck.common.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import sigma.chackcheck.common.presentation.ApiResponse;
import sigma.chackcheck.common.presentation.ApiResponseBody;
import sigma.chackcheck.common.presentation.ApiResponseGenerator;

import java.net.BindException;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /*
     * 클라이언트가 지원하지 않는 HTTP method 호출할 경우 발생
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    protected ApiResponse<ApiResponseBody.FailureBody> handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e) {
        log.warn("handleHttpRequestMethodNotSupportedException", e);
        String code = String.valueOf(HttpStatus.METHOD_NOT_ALLOWED.value());
        return ApiResponseGenerator.fail(HttpStatus.METHOD_NOT_ALLOWED, code, e.getMessage());
    }

    /*
     * javax.validation.Valid 또는 @Validated 어노테이션이 붙은 객체를 바인딩할 때 발생하는 예외
     */
    @ExceptionHandler(BindException.class)
    protected ApiResponse<ApiResponseBody.FailureBody> handleBindException(BindException e) {
        log.warn("handleBindException", e);
        String code = String.valueOf(HttpStatus.BAD_REQUEST.value());
        return ApiResponseGenerator.fail(HttpStatus.BAD_REQUEST, code, e.getMessage());
    }

    /*
     * 주로 @RequestParam 으로 받는 Enum 타입의 파라미터가 잘못된 경우 발생
     */
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    protected ApiResponse<ApiResponseBody.FailureBody> handleMethodArgumentTypeMismatchException(
            MethodArgumentTypeMismatchException e) {
        log.warn("handleMethodArgumentTypeMismatchException", e);
        String code = String.valueOf(HttpStatus.BAD_REQUEST.value());
        return ApiResponseGenerator.fail(HttpStatus.BAD_REQUEST, code, e.getMessage());
    }

    /*
     * 나머지 예외 발생
     */
    @ExceptionHandler(Exception.class)
    protected ApiResponse<ApiResponseBody.FailureBody> handleException(Exception e) {
        log.error("Exception", e);
        String code = String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value());
        return ApiResponseGenerator.fail(HttpStatus.INTERNAL_SERVER_ERROR, code, e.getMessage());
    }

    /*
     * @Valid 또는 @Validated 어노테이션을 사용하여 요청 본문의 객체를 검증할 때 발생
     */
    @ExceptionHandler({MethodArgumentNotValidException.class})
    protected ApiResponse<ApiResponseBody.FailureBody> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        String code = String.valueOf(HttpStatus.BAD_REQUEST.value());
        log.warn("MethodArgumentNotValidException", e);
        return ApiResponseGenerator.fail(
                HttpStatus.BAD_REQUEST,
                code,
                e.getBindingResult().getFieldErrors().get(0).getDefaultMessage());
    }
}
