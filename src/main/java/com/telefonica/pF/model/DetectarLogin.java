package com.telefonica.pF.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Table("DETECTARLOGIN")
public class DetectarLogin {
    @Id
    private String id;

    private String userId;
    private String isLogged;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public String getIsLogged() {
        return isLogged;
    }
    public void setIsLogged(String isLogged) {
        this.isLogged = isLogged;
    }
}
