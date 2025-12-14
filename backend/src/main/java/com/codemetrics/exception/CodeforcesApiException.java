package com.codemetrics.exception;

public class CodeforcesApiException extends RuntimeException {
    public CodeforcesApiException(String message) {
        super(message);
    }

    public CodeforcesApiException(String message, Throwable cause) {
        super(message, cause);
    }
}
