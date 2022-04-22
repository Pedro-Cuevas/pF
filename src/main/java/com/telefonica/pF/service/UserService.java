package com.telefonica.pF.service;

import com.telefonica.pF.model.User;

public interface UserService {
    Iterable<User> getUsers(String userEmail);
    User getUser(String id);
    User updateUser(String id, User user);
    void deleteUser(String id);
}