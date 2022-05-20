package com.telefonica.pF.repository;

import com.telefonica.pF.model.UserModel;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserModel, String>{
    //String porque es el tipo de la clase primaria
    @Query("SELECT * FROM USER WHERE USER_EMAIL= :userEmail")
    public Iterable<UserModel> getUsersByEmail(String userEmail);

    @Query("SELECT * FROM USER WHERE USER.ID= :id")
    public Iterable<UserModel> retrieveUser(String id);

    public UserModel findByUserName(String userName);
    //no tengo que poner @query porque el find by ya sabe por qué estoy buscando
    
}
