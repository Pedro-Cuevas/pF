package com.telefonica.pF.repository;

import com.telefonica.pF.model.User;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String>{
    //String porque es el tipo de la clase primaria
    @Query("SELECT * FROM USER WHERE USER_EMAIL= :userEmail")
    public Iterable<User> getUsersByEmail(String userEmail);

    @Query("SELECT * FROM USER WHERE USER.ID= :id")
    public Iterable<User> retrieveUser(String id);

    @Query("SELECT * FROM USER INNER JOIN DETECTARLOGIN ON DETECTARLOGIN.USER_ID=USER.ID WHERE DETECTARLOGIN.IS_LOGGED= :log")
    public Iterable<User> getUserLoggedIn(int log);
    
}
