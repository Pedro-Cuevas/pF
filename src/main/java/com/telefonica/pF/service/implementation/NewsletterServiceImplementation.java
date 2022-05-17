package com.telefonica.pF.service.implementation;

import com.telefonica.pF.model.Newsletter;
import com.telefonica.pF.repository.NewsletterRepository;
import com.telefonica.pF.service.NewsletterService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NewsletterServiceImplementation implements NewsletterService{
    @Autowired
    private NewsletterRepository newsletterRepository;

    @Override
    public Iterable<Newsletter> getAllNewsletter(){
        return newsletterRepository.findAll();
    }

    @Override
    public void deleteNewsletter(String id){
        newsletterRepository.deleteById(id);
    }

    @Override
    public Newsletter insertNewsletter(Newsletter Newsletter){
        return newsletterRepository.save(Newsletter);
    }
}
