package com.telefonica.pF.controller;

import com.telefonica.pF.model.UserModel;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
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
}
