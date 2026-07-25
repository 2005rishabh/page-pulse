package com.rishabh.page_pulse.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class HtmlParserUtilTest {

    @Test
    void shouldExtractTitleSuccessfully() {
        Document document = Jsoup.parse("<html><head><title>  Sample Page Title  </title></head><body></body></html>");
        String title = HtmlParserUtil.extractTitle(document);
        assertEquals("Sample Page Title", title);
    }

    @Test
    void shouldReturnEmptyStringWhenTitleMissing() {
        Document document = Jsoup.parse("<html><head></head><body></body></html>");
        String title = HtmlParserUtil.extractTitle(document);
        assertEquals("", title);
    }

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

    @Test
    void shouldReturnEmptyStringWhenMetaDescriptionMissing() {
        Document document = Jsoup.parse("<html><head><meta name='author' content='John Doe'></head><body></body></html>");
        String description = HtmlParserUtil.extractMetaDescription(document);
        assertEquals("", description);
    }

    @Test
    void shouldCountH1TagsCorrectly() {
        String html = "<html><body><h1>Heading 1</h1><div><h1>Heading 2</h1></div></body></html>";
        Document document = Jsoup.parse(html);
        int count = HtmlParserUtil.countH1Tags(document);
        assertEquals(2, count);
    }

    @Test
    void shouldReturnZeroWhenNoH1TagsPresent() {
        String html = "<html><body><h2>Heading 2</h2><p>Paragraph</p></body></html>";
        Document document = Jsoup.parse(html);
        int count = HtmlParserUtil.countH1Tags(document);
        assertEquals(0, count);
    }

    @Test
    void shouldCountImagesWithoutAltTextCorrectly() {
        String html = "<html><body>" +
                "<img src='a.jpg' alt='Description'>" +
                "<img src='b.jpg' alt=''>" +
                "<img src='c.jpg'>" +
                "</body></html>";
        Document document = Jsoup.parse(html);
        int missingAltCount = HtmlParserUtil.countImagesWithoutAlt(document);
        assertEquals(2, missingAltCount);
    }

    @Test
    void shouldCountVisibleWordsInBody() {
        String html = "<html><body><p>Hello world from Page Pulse</p></body></html>";
        Document document = Jsoup.parse(html);
        int wordCount = HtmlParserUtil.countVisibleWords(document);
        assertEquals(5, wordCount);
    }

    @Test
    void shouldValidateHtmlContentType() {
        assertTrue(HtmlParserUtil.isHtmlContentType("text/html; charset=UTF-8"));
        assertTrue(HtmlParserUtil.isHtmlContentType("application/xhtml+xml"));
        assertFalse(HtmlParserUtil.isHtmlContentType("application/json"));
        assertFalse(HtmlParserUtil.isHtmlContentType("image/png"));
    }
}
