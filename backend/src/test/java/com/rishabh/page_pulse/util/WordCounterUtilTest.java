package com.rishabh.page_pulse.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class WordCounterUtilTest {

    @Test
    void shouldCountWordsInNormalSentence() {
        int count = WordCounterUtil.countWords("The quick brown fox jumps over the lazy dog");
        assertEquals(9, count);
    }

    @Test
    void shouldHandleMultipleSpacesAndNewlines() {
        int count = WordCounterUtil.countWords("  Hello \n\t world  from   PagePulse  ");
        assertEquals(5, count);
    }

    @Test
    void shouldReturnZeroForNullOrBlankInput() {
        assertEquals(0, WordCounterUtil.countWords(null));
        assertEquals(0, WordCounterUtil.countWords(""));
        assertEquals(0, WordCounterUtil.countWords("   "));
    }
}
