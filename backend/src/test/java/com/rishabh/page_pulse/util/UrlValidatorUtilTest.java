package com.rishabh.page_pulse.util;

import com.rishabh.page_pulse.exception.InvalidUrlException;
import org.junit.jupiter.api.Test;

import java.net.URI;

import static org.junit.jupiter.api.Assertions.*;

class UrlValidatorUtilTest {

    @Test
    void shouldValidateCorrectHttpAndHttpsUrls() {
        URI httpUri = UrlValidatorUtil.validateUrl("http://example.com");
        assertEquals("http", httpUri.getScheme());
        assertEquals("example.com", httpUri.getHost());

        URI httpsUri = UrlValidatorUtil.validateUrl("https://example.com/path?query=1");
        assertEquals("https", httpsUri.getScheme());
        assertEquals("example.com", httpsUri.getHost());
    }

    @Test
    void shouldThrowExceptionForNullOrBlankUrl() {
        assertThrows(InvalidUrlException.class, () -> UrlValidatorUtil.validateUrl(null));
        assertThrows(InvalidUrlException.class, () -> UrlValidatorUtil.validateUrl("   "));
    }

    @Test
    void shouldThrowExceptionForUnsupportedScheme() {
        assertThrows(InvalidUrlException.class, () -> UrlValidatorUtil.validateUrl("ftp://example.com"));
        assertThrows(InvalidUrlException.class, () -> UrlValidatorUtil.validateUrl("file:///etc/passwd"));
        assertThrows(InvalidUrlException.class, () -> UrlValidatorUtil.validateUrl("example.com"));
    }

    @Test
    void shouldThrowExceptionForUrlWithoutHost() {
        assertThrows(InvalidUrlException.class, () -> UrlValidatorUtil.validateUrl("https://"));
    }
}
