package sigma.chackcheck.common.presentation;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

public class ApiResponseBody {
    @Getter
    @AllArgsConstructor
    public static class FailureBody implements Serializable {
        private String status;
        private String code;
        private String message;
    }

    @Getter
    @AllArgsConstructor
    public static class SuccessBody<D> implements Serializable {
        private String status;
        private String message;
        private D data;
    }
}