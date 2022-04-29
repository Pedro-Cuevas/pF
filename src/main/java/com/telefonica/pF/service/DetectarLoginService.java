package com.telefonica.pF.service;

import com.telefonica.pF.model.DetectarLogin;

public interface DetectarLoginService {
    Iterable<DetectarLogin> getLogin();
    DetectarLogin getLogged();
}
