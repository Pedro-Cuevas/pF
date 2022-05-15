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

import com.telefonica.pF.model.Sugerencia;
import com.telefonica.pF.repository.SugerenciasRepository;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SugerenciasE2ETest {
    @LocalServerPort
    private int port;

    @Autowired
    private SugerenciasRepository repository;

    @Autowired
    private TestRestTemplate restTemplate;

    //TESTING GET
    @Test
    public void sugerenciaGetTest() {
        Iterable<Sugerencia> sugerencias = repository.findAll();

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/sugerencias";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<String> entity = new HttpEntity<>(headers);


        ResponseEntity<Iterable<Sugerencia>> result = restTemplate.exchange(
            url,
            HttpMethod.GET,
            entity,
            new ParameterizedTypeReference<Iterable<Sugerencia>>(){}
        );

        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(sugerencias);
    }

    //TESTING POST
    //Como tambien estamos probando DELETE, hay que tener cuidado cuando se itera con Id
    @Test
    public void sugerenciaPostTest() {

        Sugerencia newSugerencia = new Sugerencia();
        newSugerencia.setSugerenciaMail("amigodepedro@gmail.com");
        newSugerencia.setSugerenciaText("Subid el salario a Pedro por favor");

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/sugerencias";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<Sugerencia> entity = new HttpEntity<>(newSugerencia, headers);


        ResponseEntity<Sugerencia> result = restTemplate.exchange(
            url,
            HttpMethod.POST,
            entity,
            new ParameterizedTypeReference<Sugerencia>(){}
        );
        
        Iterable<Sugerencia> sugerenciaList = repository.findAll();
        Iterator<Sugerencia> iterator = sugerenciaList.iterator();
        Sugerencia last = null;

        while(iterator.hasNext()){
            last = (Sugerencia) iterator.next();
        }
        newSugerencia.setId(last.getId());

        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(last);
        then(result.getBody()).isEqualTo(newSugerencia);
    } 

    //TESTING DELETE
    @Test
    public void sugerenciaDeleteTest() {
        Iterable<Sugerencia> sugerencias1 = repository.findAll();

        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/sugerencias/3";
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic UGVkcm86MTIzNDU=");
        HttpEntity<String> entity = new HttpEntity<>(headers);


        ResponseEntity<Iterable<Sugerencia>> result = restTemplate.exchange(
            url,
            HttpMethod.DELETE,
            entity,
            new ParameterizedTypeReference<Iterable<Sugerencia>>(){}
        );

        Iterable<Sugerencia> sugerencias2 = repository.findAll();
        
        then(result.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
        then(!sugerencias1.iterator().next().equals(sugerencias2.iterator().next()));
    }
}
