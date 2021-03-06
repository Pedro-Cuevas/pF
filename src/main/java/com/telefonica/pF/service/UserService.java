package com.telefonica.pF.service;

import com.telefonica.pF.model.UserModel;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    Iterable<UserModel> getUsers(String userEmail);
    UserModel getUser(String id);
    UserModel updateUser(String id, UserModel user);
    void deleteUser(String id);
    UserModel insertUser(UserModel user);
    UserModel create(UserModel user);

}