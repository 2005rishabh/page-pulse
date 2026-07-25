package com.rishabh.page_pulse.exception;

import com.rishabh.page_pulse.enums.ErrorType;

public class NonHtmlContentException extends RuntimeException {

    private final ErrorType errorType;

    public NonHtmlContentException(String message, ErrorType errorType) {
        super(message);
        this.errorType = errorType;
    }

    public ErrorType getErrorType() {
        return errorType;
    }
}
