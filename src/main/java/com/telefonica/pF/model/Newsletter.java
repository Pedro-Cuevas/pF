package com.telefonica.pF.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Table("NEWSLETTER")
public class Newsletter {
    @Id
    private String id;

    private String newsletterMail;
    private String name;
    private String gender;


    public Newsletter(String id, String newsletterMail, String name, String gender) {
        this.id = id;
        this.setNewsletterMail(newsletterMail);;
        this.name = name;
        this.gender = gender;
    }
    
    

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNewsletterMail() {
        return this.newsletterMail;
    }

    public void setNewsletterMail(String newsletterMail) {
        if(newsletterMail.matches("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")){
            this.newsletterMail = newsletterMail;
        } else {
            this.newsletterMail = null;
        }
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return this.gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

}
