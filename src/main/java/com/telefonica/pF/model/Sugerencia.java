package com.telefonica.pF.model;

import java.util.Objects;

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


    public Sugerencia() {
    }


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


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Sugerencia)) {
            return false;
        }
        Sugerencia sugerencia = (Sugerencia) o;
        return Objects.equals(id, sugerencia.id) && Objects.equals(sugerenciaMail, sugerencia.sugerenciaMail) && Objects.equals(sugerenciaText, sugerencia.sugerenciaText);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, sugerenciaMail, sugerenciaText);
    }

}
