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

import com.telefonica.pF.model.UserModel;
import com.telefonica.pF.repository.UserRepository;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserE2ETest {
    @LocalServerPort
    private int port;

    @Autowired
    private UserRepository repository;

    @Autowired
    private TestRestTemplate restTemplate;

    //TESTING GET
    @Test
    public void userGetTest() {
        Iterable<UserModel> users = repository.findAll();

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/users";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<String> entity = new HttpEntity<>(headers);


        ResponseEntity<Iterable<UserModel>> result = restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            new ParameterizedTypeReference<Iterable<UserModel>>(){}
        );

        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(users);
    }

    //TESTING PUT
    //Como tambien estamos probando DELETE, hay que tener cuidado cuando se itera con Id
    @Test
    public void userPutTest(){
        UserModel newUser = new UserModel("2", "Victoria" , "Federica", "universidad de la vida", "patinpiti@gmail.com", "coletas", "ROLE_USER");

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/users/2";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<UserModel> entity = new HttpEntity<>(newUser, headers);


        ResponseEntity<UserModel> result = restTemplate.exchange(
            url,
            HttpMethod.PUT,
            entity,
            new ParameterizedTypeReference<UserModel>(){}
        );

        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(newUser);
    }


    //TESTING POST
    //Como tambien estamos probando DELETE, hay que tener cuidado cuando se itera con Id
    @Test
    public void userPostTest() {

        UserModel newUser = new UserModel("Victoria" , "Piti", "universidad de la vida", "patinpiti@gmail.com", "coletas", "ROLE_USER");

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/users";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<UserModel> entity = new HttpEntity<>(newUser, headers);


        ResponseEntity<UserModel> result = restTemplate.exchange(
            url,
            HttpMethod.POST,
            entity,
            new ParameterizedTypeReference<UserModel>(){}
        );
        
        Iterable<UserModel> userList = repository.findAll();
        Iterator<UserModel> iterator = userList.iterator();
        UserModel last = null;

        while(iterator.hasNext()){
            last = (UserModel) iterator.next();
        }
        newUser.setId(last.getId());
        newUser.setUserPassword(last.getUserPassword());

        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(last);
        then(result.getBody()).isEqualTo(newUser);
    } 

    //TESTING DELETE
    @Test
    public void userDeleteTest() {
        Iterable<UserModel> users1 = repository.findAll();

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/users/3";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<String> entity = new HttpEntity<>(headers);


        ResponseEntity<Iterable<UserModel>> result = restTemplate.exchange(
            url,
            HttpMethod.DELETE,
            entity,
            new ParameterizedTypeReference<Iterable<UserModel>>(){}
        );

        Iterable<UserModel> users2 = repository.findAll();
        
        then(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        then(!users1.iterator().next().equals(users2.iterator().next()));
    }
}