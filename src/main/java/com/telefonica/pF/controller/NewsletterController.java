package com.telefonica.pF.controller;

import com.telefonica.pF.model.Newsletter;
import com.telefonica.pF.service.NewsletterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class NewsletterController {
    @Autowired
    private NewsletterService newsletterService;

    @GetMapping("/newsletters")
    public ResponseEntity<Iterable<Newsletter>> getAllNewsletters() {
        Iterable<Newsletter> response = newsletterService.getAllNewsletter();

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/newsletters/{id}")
    public ResponseEntity<Newsletter> deleteNewsletter(@PathVariable String id) {
        newsletterService.deleteNewsletter(id);

        return ResponseEntity.noContent().build();
    }


    @PostMapping("/newsletters")
    public ResponseEntity<Newsletter> createOffer(@RequestBody Newsletter newsletter) {
        Newsletter newNewsletter = newsletterService.insertNewsletter(newsletter);
        return ResponseEntity.ok().body(newNewsletter);
    }
}
