package com.telefonica.pF.service;

import com.telefonica.pF.model.Newsletter;

public interface NewsletterService {
    Iterable<Newsletter> getAllNewsletter();
    void deleteNewsletter(String id);
    Newsletter insertNewsletter(Newsletter newsletter);   
}
