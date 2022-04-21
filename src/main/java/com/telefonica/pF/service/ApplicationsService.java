package com.telefonica.pF.service;

import com.telefonica.pF.model.Application;

public interface ApplicationsService {
    Iterable<Application> getApplications();
    Application getApplication(String id);
    void deleteApplication(String id); 
    Application insertApplication(Application Application);
    Application updateApplication(String id, Application Application);   
}
