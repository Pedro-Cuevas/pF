package com.telefonica.pF.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
public class AuthController {
    @GetMapping("/login")
    public String loginPage(){
        return "login";
        //thymeleaf busca en mis archivos uno que se llame login
    }

}
