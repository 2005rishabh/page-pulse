package com.rishabh.page_pulse.exception;

import com.rishabh.page_pulse.enums.ErrorType;

public class WebsiteUnavailableException extends RuntimeException {

    private final ErrorType errorType;

    public WebsiteUnavailableException(String message, Throwable cause, ErrorType errorType) {
        super(message, cause);
        this.errorType = errorType;
    }

    public ErrorType getErrorType() {
        return errorType;
    }
}
