package com.rishabh.page_pulse.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class HtmlParserUtilTest {

    @Test
    void shouldExtractMetaDescriptionFromNameAttribute() {
        Document document = Jsoup
                .parse("<html><head><meta name='description' content='Test description'></head><body></body></html>");

        String description = HtmlParserUtil.extractMetaDescription(document);

        assertEquals("Test description", description);
    }

    @Test
    void shouldExtractMetaDescriptionFromOpenGraphTag() {
        Document document = Jsoup.parse(
                "<html><head><meta property='og:description' content='Open graph description'></head><body></body></html>");

        String description = HtmlParserUtil.extractMetaDescription(document);

        assertEquals("Open graph description", description);
    }

    @Test
    void shouldExtractMetaDescriptionFromMixedCaseNameAttribute() {
        Document document = Jsoup.parse(
                "<html><head><meta name='Description' content='Mixed case description'></head><body></body></html>");

        String description = HtmlParserUtil.extractMetaDescription(document);

        assertEquals("Mixed case description", description);
    }
}
