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
   

    @Test
    public void applicationDeketeTest() {
        Iterable<Application> applications_1 = repository.findAll();

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/applications/1";
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
