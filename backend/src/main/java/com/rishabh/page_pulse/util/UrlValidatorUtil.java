package com.rishabh.page_pulse.util;

import com.rishabh.page_pulse.constants.AppConstants;
import com.rishabh.page_pulse.enums.ErrorType;
import com.rishabh.page_pulse.exception.InvalidUrlException;

import java.net.URI;
import java.net.URISyntaxException;

public final class UrlValidatorUtil {

    private UrlValidatorUtil() {
    }

    public static URI validateUrl(String url) {
        if (url == null || url.isBlank()) {
            throw new InvalidUrlException("URL must not be blank", ErrorType.INVALID_URL);
        }

        try {
            URI uri = new URI(url.trim());
            if (uri.getScheme() == null
                    || !(uri.getScheme().equalsIgnoreCase("http") || uri.getScheme().equalsIgnoreCase("https"))) {
                throw new InvalidUrlException("URL must use http or https scheme", ErrorType.INVALID_URL);
            }
            if (uri.getHost() == null || uri.getHost().isBlank()) {
                throw new InvalidUrlException("URL must contain a valid host", ErrorType.INVALID_URL);
            }
            return uri;
        } catch (URISyntaxException exception) {
            throw new InvalidUrlException("URL is not valid: " + exception.getInput(), ErrorType.INVALID_URL,
                    exception);
        }
    }
}
