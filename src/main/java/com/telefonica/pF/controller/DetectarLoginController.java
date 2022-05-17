package com.telefonica.pF.controller;

import com.telefonica.pF.model.DetectarLogin;
import com.telefonica.pF.model.UserModel;
import com.telefonica.pF.service.DetectarLoginService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class DetectarLoginController {

    @GetMapping("/login")
    public ResponseEntity<String> getLoggedUser(@AuthenticationPrincipal UserModel user){
       Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       String nombre = authentication.getName();
       return ResponseEntity.ok().body(nombre);
    }

    
    @Autowired
    private DetectarLoginService detectarLoginService;
    
    //UPDATE
    @PutMapping("/login/{id}")
    public ResponseEntity<DetectarLogin> updateOffer(@PathVariable String id, @RequestBody DetectarLogin detectarLogin){
        DetectarLogin update = detectarLoginService.updateLogin(id, detectarLogin);
        return ResponseEntity.ok().body(update);
    }

    //CREATE
    @PostMapping("/login")
    public ResponseEntity<DetectarLogin> createLogin(@RequestBody DetectarLogin detectarLogin) {
        DetectarLogin newLogin = detectarLoginService.insertLogin(detectarLogin);
        return ResponseEntity.ok().body(newLogin);
    }
    /*
    //SELECT
    @GetMapping("/login")
    public ResponseEntity<Iterable<DetectarLogin>> getLogin() {

        Iterable<DetectarLogin> response = detectarLoginService.getLogin();

        return ResponseEntity.ok().body(response);
    }
    
    @GetMapping("/login/logged")
    public ResponseEntity<DetectarLogin> getLogged() {

        DetectarLogin response = detectarLoginService.getLogged();

        return ResponseEntity.ok().body(response);
    }

    //UPDATE
    @PutMapping("/login/{id}")
    public ResponseEntity<DetectarLogin> updateOffer(@PathVariable String id, @RequestBody DetectarLogin detectarLogin){
        DetectarLogin update = detectarLoginService.updateLogin(id, detectarLogin);
        return ResponseEntity.ok().body(update);
    }

    //CREATE
    @PostMapping("/login")
    public ResponseEntity<DetectarLogin> createLogin(@RequestBody DetectarLogin detectarLogin) {
        DetectarLogin newLogin = detectarLoginService.insertLogin(detectarLogin);
        return ResponseEntity.ok().body(newLogin);
    }*/
}
