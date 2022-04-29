package com.telefonica.pF.service.implementation;


import com.telefonica.pF.model.User;
import com.telefonica.pF.repository.UserRepository;
import com.telefonica.pF.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplementation implements UserService {
    
    @Autowired
    private UserRepository userRepository;

    @Override
    public Iterable<User> getUsers(String userEmail){
        if(userEmail == null){
            return userRepository.findAll();
        } else {
            return userRepository.getUsersByEmail(userEmail);
        }
        
    }

    @Override
    public User getUser(String id){
        User response = null;
        if(userRepository.existsById(id)){
            Iterable<User> users = userRepository.retrieveUser(id);
            for(User user : users){
                response = user;
            }
            return response;            
        }
        return response;
    }

    @Override
    public User updateUser(String id, User user){
        if(userRepository.existsById(id)){
            return userRepository.save(user);
        } else {
            return null;
        }
        
    }

    @Override
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    @Override
    public User insertUser(User user){
        return userRepository.save(user);
    }

    @Override
    public User getUserLoggedIn(){
        int log = 1;
        Iterable<User> users = userRepository.getUserLoggedIn(log);
        User response = null;
        for(User user : users){
                response = user;
        }
        return response;            
    }
}
