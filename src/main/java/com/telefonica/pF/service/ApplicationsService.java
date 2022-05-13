package com.telefonica.pF.service;

import com.telefonica.pF.model.Application;

public interface ApplicationsService {
    Iterable<Application> getApplications();
    Application getApplication(String id);
    Iterable<Application> getApplicationByUserId(String userId);
    Application getApplicationByOfferUser(String offerId, String userId);
    void deleteApplication(String id); 
    Application insertApplication(Application Application);
    Application updateApplication(String id, Application Application);   
}
