package com.telefonica.pF.service;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginServiceResult {
    Boolean flag;
    String access_token;

    public LoginServiceResult(boolean flag) {
        this.flag = flag;
    }

    public LoginServiceResult(boolean flag, String access_token) {
        this.flag = flag;
        this.access_token = access_token;
    }
}