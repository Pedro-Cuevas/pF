package com.telefonica.pF.service.implementation;

import com.telefonica.pF.model.Application;
import com.telefonica.pF.repository.ApplicationRepository;
import com.telefonica.pF.service.ApplicationsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApplicationsServiceImplementation implements ApplicationsService{
    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public Iterable<Application> getApplications(){
        return applicationRepository.findAll();
    }

    @Override
    public Application getApplication(String id){
        Application response = null;
        if(applicationRepository.existsById(id)){
            Iterable<Application> Applications = applicationRepository.getApplicationByID(id);
            for(Application Application : Applications){
                response = Application;
            }
            return response;            
        }
        return response;
    }

    @Override
    public Iterable<Application> getApplicationByUserId(String userId){
        Iterable<Application> response = applicationRepository.getApplicationByUserId(userId);
        return response;
    }

    @Override
    public Application getApplicationByOfferUser(String offerId, String userId){
        Application response = null;
        Iterable<Application> applications = applicationRepository.getApplicationByOfferUser(offerId, userId);
        for(Application Application : applications){
            response = Application;
        }
        return response;
    }


    @Override
    public void deleteApplication(String id){
        applicationRepository.deleteById(id);
    }

    @Override
    public Application insertApplication(Application Application){
        return applicationRepository.save(Application);
    }

    @Override
    public Application updateApplication(String id, Application Application){
        if(applicationRepository.existsById(id)){
            return applicationRepository.save(Application);
        } else {
            return null;
        }
        
    }
    
}
