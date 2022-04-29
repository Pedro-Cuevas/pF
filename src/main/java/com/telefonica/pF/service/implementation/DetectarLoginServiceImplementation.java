package com.telefonica.pF.service.implementation;

import com.telefonica.pF.model.DetectarLogin;
import com.telefonica.pF.repository.DetectarLoginRepository;
import com.telefonica.pF.service.DetectarLoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DetectarLoginServiceImplementation implements DetectarLoginService{
    @Autowired
    private DetectarLoginRepository detectarLoginRepository;

    @Override
    public Iterable<DetectarLogin> getLogin(){
        return detectarLoginRepository.findAll();
    }
    @Override
    public DetectarLogin getLogged(){
        int log = 1;
        Iterable<DetectarLogin> logs = detectarLoginRepository.getLogged(log);
        DetectarLogin response = null;
        for(DetectarLogin detectarLogin : logs){
                response = detectarLogin;
        }
        return response; 
    }
    
}
