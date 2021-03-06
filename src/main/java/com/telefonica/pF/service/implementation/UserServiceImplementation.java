package com.telefonica.pF.service.implementation;


import java.util.ArrayList;
import java.util.List;

import com.telefonica.pF.model.UserModel;
import com.telefonica.pF.repository.UserRepository;
import com.telefonica.pF.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class UserServiceImplementation implements UserService {
    
    Logger logger = LoggerFactory.getLogger(UserServiceImplementation.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public Iterable<UserModel> getUsers(String userEmail){
        if(userEmail == null){
            return userRepository.findAll();
        } else {
            return userRepository.getUsersByEmail(userEmail);
        }
        
    }

    @Override
    public UserModel getUser(String id){
        UserModel response = null;
        if(userRepository.existsById(id)){
            Iterable<UserModel> users = userRepository.retrieveUser(id);
            for(UserModel user : users){
                response = user;
            }
            return response;            
        }
        return response;
    }

    @Override
    public UserModel updateUser(String id, UserModel user){
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
    public UserModel insertUser(UserModel user){
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String userName) {
        UserModel user = userRepository.findByUserName(userName);
        List<GrantedAuthority> authorities = new ArrayList<>();
        //lista vac??a de roles, administrador/usuario
        //convierto el usuario que he buscado por userName a UserDetails
        UserDetails newUser = new User(user.getUserName(), user.getUserPassword(), authorities);
        return newUser;
    }

    @Override
    public UserModel create(UserModel user){
        user.setId(null);
        return userRepository.save(user);
    }

}
