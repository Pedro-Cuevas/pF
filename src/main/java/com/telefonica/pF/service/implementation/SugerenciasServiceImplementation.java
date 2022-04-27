package com.telefonica.pF.service.implementation;

import com.telefonica.pF.model.Sugerencia;
import com.telefonica.pF.repository.SugerenciasRepository;
import com.telefonica.pF.service.SugerenciasService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SugerenciasServiceImplementation implements SugerenciasService{
    @Autowired
    private SugerenciasRepository sugerenciasRepository;

    @Override
    public Iterable<Sugerencia> getAllSugerencias(){
        return sugerenciasRepository.findAll();
    }

    @Override
    public void deleteSugerencia(String id){
        sugerenciasRepository.deleteById(id);
    }

    @Override
    public Sugerencia insertSugerencia(Sugerencia sugerencia){
        return sugerenciasRepository.save(sugerencia);
    }
}
