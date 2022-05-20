package com.telefonica.pF.repository;

import com.telefonica.pF.model.Application;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface ApplicationRepository  extends CrudRepository<Application,String> {
    @Query("SELECT * FROM APPLICATIONS WHERE APPLICATIONS.APP_ID= :id")
    public Iterable<Application> getApplicationByID(String id);

    @Query("SELECT * FROM APPLICATIONS WHERE APPLICATIONS.USER_ID= :userId")
    public Iterable<Application> getApplicationByUserId(String userId);

    @Query("SELECT * FROM APPLICATIONS WHERE APPLICATIONS.USER_ID= :userId AND APPLICATIONS.OFFER_ID= :offerId")
    public Iterable<Application> getApplicationByOfferUser(String offerId, String userId);
} 
