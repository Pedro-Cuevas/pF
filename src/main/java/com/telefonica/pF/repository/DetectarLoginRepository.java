package com.telefonica.pF.repository;

import com.telefonica.pF.model.DetectarLogin;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface DetectarLoginRepository extends CrudRepository<DetectarLogin,String>{
    @Query("SELECT * FROM DETECTARLOGIN WHERE DETECTARLOGIN.IS_LOGGED= :log")
    public Iterable<DetectarLogin> getLogged(int log);
}
