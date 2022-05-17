package com.telefonica.pF.repository;

import com.telefonica.pF.model.Newsletter;

import org.springframework.data.repository.CrudRepository;

public interface NewsletterRepository extends CrudRepository<Newsletter, String> {}
