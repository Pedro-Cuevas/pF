package com.telefonica.pF.controller;

import com.telefonica.pF.model.Sugerencia;
import com.telefonica.pF.service.SugerenciasService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class SugerenciasController {
    @Autowired
    private SugerenciasService sugerenciasService;

    @GetMapping("/sugerencias")
    public ResponseEntity<Iterable<Sugerencia>> getAllSugerencias() {
        Iterable<Sugerencia> response = sugerenciasService.getAllSugerencias();

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/sugerencias/{id}")
    public ResponseEntity<Sugerencia> deleteSugerencia(@PathVariable String id) {
        sugerenciasService.deleteSugerencia(id);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/sugerencias")
    public ResponseEntity<Sugerencia> createOffer(@RequestBody Sugerencia sugerencia) {
        Sugerencia newSugerencia = sugerenciasService.insertSugerencia(sugerencia);
        return ResponseEntity.ok().body(newSugerencia);
    }
}
