package com.rishabh.page_pulse.util;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public final class HtmlParserUtil {

    private HtmlParserUtil() {
    }

    public static boolean isHtmlContentType(String contentType) {
        String lower = contentType.toLowerCase();
        return lower.contains("text/html") || lower.contains("application/xhtml+xml");
    }

    public static Document parseHtml(String html, String baseUri) {
        return Jsoup.parse(html, baseUri);
    }

    public static String extractTitle(Document document) {
        String title = document.title();
        return title == null ? "" : title.trim();
    }

    public static String extractMetaDescription(Document document) {
        Elements metaTags = document.select("meta");

        for (Element metaTag : metaTags) {
            String name = metaTag.attr("name");
            String property = metaTag.attr("property");
            String content = metaTag.attr("content");

            if (name != null && !name.isBlank() && name.equalsIgnoreCase("description") && !content.isBlank()) {
                return content.trim();
            }

            if (property != null && !property.isBlank() && property.equalsIgnoreCase("og:description")
                    && !content.isBlank()) {
                return content.trim();
            }
        }

        return "";
    }

    public static int countH1Tags(Document document) {
        Elements headings = document.select("h1");
        return headings.size();
    }

    public static int countImagesWithoutAlt(Document document) {
        Elements images = document.select("img");
        return (int) images.stream()
                .filter(image -> image.attr("alt").isBlank())
                .count();
    }

    public static int countVisibleWords(Document document) {
        String text = document.body() != null ? document.body().text() : "";
        return WordCounterUtil.countWords(text);
    }
}
