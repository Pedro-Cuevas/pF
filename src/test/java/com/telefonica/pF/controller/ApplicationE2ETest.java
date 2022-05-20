package com.telefonica.pF.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.BDDAssertions.then;

import java.util.Iterator;

import com.telefonica.pF.model.Application;
import com.telefonica.pF.repository.ApplicationRepository;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ApplicationE2ETest {
    @LocalServerPort
    private int port;

    @Autowired
    private ApplicationRepository repository;

    @Autowired
    private TestRestTemplate restTemplate;

    //TESTING GET
    @Test
    public void applicationGetTest() {
        Iterable<Application> applications = repository.findAll();

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/applications";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<String> entity = new HttpEntity<>(headers);


        ResponseEntity<Iterable<Application>> result = restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            new ParameterizedTypeReference<Iterable<Application>>(){}
        );

        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(applications);
    }

    //TESTING PUT
    @Test
    public void applicationPutTest(){
        Application newAppPut = new Application();
        newAppPut.setAppId("2");
        newAppPut.setOfferId("3");
        newAppPut.setUserId("2");

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/applications/2";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<Application> entity = new HttpEntity<>(newAppPut, headers);


        ResponseEntity<Application> result = restTemplate.exchange(
            url,
            HttpMethod.PUT,
            entity,
            new ParameterizedTypeReference<Application>(){}
        );

        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(newAppPut);
    }


    //TESTING POST
    @Test
    public void applicationPostTest() {

        Application newAppPost = new Application();
        newAppPost.setOfferId("3");
        newAppPost.setUserId("2");

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/applications";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<Application> entity = new HttpEntity<>(newAppPost, headers);


        ResponseEntity<Application> result = restTemplate.exchange(
            url,
            HttpMethod.POST,
            entity,
            new ParameterizedTypeReference<Application>(){}
        );
        
        Iterable<Application> appList = repository.findAll();
        Iterator<Application> iterator = appList.iterator();
        Application last = null;

        while(iterator.hasNext()){
            last = (Application) iterator.next();
        }
        newAppPost.setAppId(last.getAppId());

        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(last);
        then(result.getBody()).isEqualTo(newAppPost);
    } 

    //TESTING DELETE
    @Test
    public void applicationDeleteTest() {
        Iterable<Application> applications_1 = repository.findAll();

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/applications/3";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<String> entity = new HttpEntity<>(headers);


        ResponseEntity<Iterable<Application>> result = restTemplate.exchange(
            url,
            HttpMethod.DELETE,
            entity,
            new ParameterizedTypeReference<Iterable<Application>>(){}
        );

        Iterable<Application> applications_2 = repository.findAll();
        
        then(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        then(!applications_1.iterator().next().equals(applications_2.iterator().next()));
    }
}
