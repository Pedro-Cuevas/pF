package com.telefonica.pF.service;

import com.telefonica.pF.model.Sugerencia;

public interface SugerenciasService {
    Iterable<Sugerencia> getAllSugerencias();
    void deleteSugerencia(String id);
    Sugerencia insertSugerencia(Sugerencia sugerencia);
}
