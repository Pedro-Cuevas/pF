package com.telefonica.pF.controller;


import com.telefonica.pF.model.UserModel;
import com.telefonica.pF.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public ResponseEntity<Iterable<UserModel>> getUsers(@RequestParam(required=false) String userEmail, @AuthenticationPrincipal User user){
        // /api/v1/users/?userEmail=Nombre1
        Iterable<UserModel> respuesta = userService.getUsers(userEmail);
        return ResponseEntity.ok().body(respuesta);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserModel> getUser(@PathVariable String id){
        UserModel respuesta = userService.getUser(id);
        return ResponseEntity.ok().body(respuesta);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserModel> updateUser(@PathVariable String id, @RequestBody UserModel user){
        UserModel newUser = userService.updateUser(id, user);
        return ResponseEntity.ok().body(newUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<UserModel> deleteUser(@PathVariable String id){
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/users")
    public ResponseEntity<UserModel> createUser(@RequestBody UserModel user) {
        String hashedPassword = passwordEncoder.encode(user.getUserPassword());
        user.setUserPassword(hashedPassword); //para guardar la contraseña con hash

        UserModel newUser = userService.create(user);
        return ResponseEntity.ok().body(newUser);

    }
}
