package com.telefonica.pF.controller;


import com.telefonica.pF.model.User;
import com.telefonica.pF.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/users")
    public ResponseEntity<Iterable<User>> getUsers(@RequestParam(required=false) String userEmail){
        // /api/v1/users/?userEmail=Nombre1
        Iterable<User> respuesta = userService.getUsers(userEmail);
        return ResponseEntity.ok().body(respuesta);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id){
        User respuesta = userService.getUser(id);
        return ResponseEntity.ok().body(respuesta);
    }


    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User user){
        User newUser = userService.updateUser(id, user);
        return ResponseEntity.ok().body(newUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable String id){
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
