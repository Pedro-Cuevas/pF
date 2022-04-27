package com.telefonica.pF.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Table("SUGERENCIAS")
public class Sugerencia {
    @Id
    private String id;

    private String sugerenciaMail;
    private String sugerenciaText;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSugerenciaMail() {
        return this.sugerenciaMail;
    }

    public void setSugerenciaMail(String sugerenciaMail) {
        this.sugerenciaMail = sugerenciaMail;
    }

    public String getSugerenciaText() {
        return this.sugerenciaText;
    }

    public void setSugerenciaText(String sugerenciaText) {
        this.sugerenciaText = sugerenciaText;
    }
}
