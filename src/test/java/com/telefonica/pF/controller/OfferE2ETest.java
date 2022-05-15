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

import java.time.LocalDate;
import java.util.Iterator;

import com.telefonica.pF.model.Offer;
import com.telefonica.pF.repository.OfferRepository;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class OfferE2ETest {
    @LocalServerPort
    private int port;

    @Autowired
    private OfferRepository repository;

    @Autowired
    private TestRestTemplate restTemplate;

    //TESTING GET
    @Test
    public void offerGetTest() {
        Iterable<Offer> offers = repository.findAll();

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/offers";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<String> entity = new HttpEntity<>(headers);


        ResponseEntity<Iterable<Offer>> result = restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            new ParameterizedTypeReference<Iterable<Offer>>(){}
        );

        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(offers);
    }

    //TESTING PUT
    //Como tambien estamos probando DELETE, hay que tener cuidado cuando se itera con Id
    @Test
    public void offerPutTest(){
        Offer newOffer = new Offer();
        newOffer.setId("2");
        newOffer.setOfferName("Oferta de pruebas");
        newOffer.setDateBegining(LocalDate.of(2022, 1, 15));
        newOffer.setDateEnd(LocalDate.of(2022, 1, 20));
        newOffer.setOfferDescription("Hay muchos programadores mejores que Pedro. Pocos igual de guapos.");
        newOffer.setOfferAvailable("Disponible");

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/offers/2";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<Offer> entity = new HttpEntity<>(newOffer, headers);


        ResponseEntity<Offer> result = restTemplate.exchange(
            url,
            HttpMethod.PUT,
            entity,
            new ParameterizedTypeReference<Offer>(){}
        );

        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(newOffer);
    }


    //TESTING POST
    //Como tambien estamos probando DELETE, hay que tener cuidado cuando se itera con Id
    @Test
    public void offerPostTest() {

        Offer newOffer = new Offer();
        newOffer.setOfferName("Oferta de pruebas");
        newOffer.setDateBegining(LocalDate.of(2022, 1, 15));
        newOffer.setDateEnd(LocalDate.of(2022, 1, 20));
        newOffer.setOfferDescription("Esta práctica está disponible, igual que Pedro.");
        newOffer.setOfferAvailable("Disponible");

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/offers";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<Offer> entity = new HttpEntity<>(newOffer, headers);


        ResponseEntity<Offer> result = restTemplate.exchange(
            url,
            HttpMethod.POST,
            entity,
            new ParameterizedTypeReference<Offer>(){}
        );
        
        Iterable<Offer> offerList = repository.findAll();
        Iterator<Offer> iterator = offerList.iterator();
        Offer last = null;

        while(iterator.hasNext()){
            last = (Offer) iterator.next();
        }
        newOffer.setId(last.getId());

        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(last);
        then(result.getBody()).isEqualTo(newOffer);
    } 

    //TESTING DELETE
    @Test
    public void offerDeleteTest() {
        Iterable<Offer> offers1 = repository.findAll();

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/offers/2";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<String> entity = new HttpEntity<>(headers);


        ResponseEntity<Iterable<Offer>> result = restTemplate.exchange(
            url,
            HttpMethod.DELETE,
            entity,
            new ParameterizedTypeReference<Iterable<Offer>>(){}
        );

        Iterable<Offer> offers2 = repository.findAll();
        
        then(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        then(!offers1.iterator().next().equals(offers2.iterator().next()));
    }
}
