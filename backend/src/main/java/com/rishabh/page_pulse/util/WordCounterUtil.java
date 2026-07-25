package com.rishabh.page_pulse.util;

public final class WordCounterUtil {

    private WordCounterUtil() {
    }

    public static int countWords(String text) {
        if (text == null || text.isBlank()) {
            return 0;
        }
        String[] tokens = text.trim().split("\\s+");
        return tokens.length;
    }
}
