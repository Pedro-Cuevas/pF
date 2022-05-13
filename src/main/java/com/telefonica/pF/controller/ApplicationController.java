package com.telefonica.pF.controller;

import com.telefonica.pF.model.Application;
import com.telefonica.pF.service.ApplicationsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ApplicationController {
    @Autowired
    private ApplicationsService applicationsService;
    
    //SELECT
    @GetMapping("/applications")
    public ResponseEntity<Iterable<Application>> getApplications() {

        Iterable<Application> response = applicationsService.getApplications();

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/applications/{id}")
    public ResponseEntity<Application> getApplication(@PathVariable String id){
        Application response = applicationsService.getApplication(id);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/applications/user/{userId}")
    public ResponseEntity<Iterable<Application>> getApplicationByUserId(@PathVariable String userId){
        Iterable<Application> response = applicationsService.getApplicationByUserId(userId);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/applications/offerUser/{offerId}/{userId}")
    public ResponseEntity<Application> getApplicationByUserId(@PathVariable String offerId, @PathVariable String userId){
        Application response = applicationsService.getApplicationByOfferUser(offerId, userId);
        return ResponseEntity.ok().body(response);
    }

    //DELETE
    @DeleteMapping("/applications/{id}")
    public ResponseEntity<Application> deleteApplication(@PathVariable String id) {
        applicationsService.deleteApplication(id);
        return ResponseEntity.noContent().build();
    }

    //INSERT
    @PostMapping("/applications")
    public ResponseEntity<Application> createApplication(@RequestBody Application application) {
        Application newapplication = applicationsService.insertApplication(application);
        return ResponseEntity.ok().body(newapplication);
    }

    //UPDATE
    @PutMapping("/applications/{id}")
    public ResponseEntity<Application> updateapplication(@PathVariable String id, @RequestBody Application application){
        Application update = applicationsService.updateApplication(id, application);
        return ResponseEntity.ok().body(update);
    }
}
