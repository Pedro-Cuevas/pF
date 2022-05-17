package com.telefonica.pF.model;

import org.junit.Test;

import org.junit.Assert;

public class NewsletterTest {
    @Test
    public void badMail(){
        Newsletter newsletterBad = new Newsletter("1", "a", "rafa", "H");
        Assert.assertNull(newsletterBad.getNewsletterMail());
    }

    @Test
    public void goodMail(){
        Newsletter newsletterGood = new Newsletter("1", "a@b.com", "rafa", "H");
        Assert.assertNotNull(newsletterGood.getNewsletterMail());
    }
}
