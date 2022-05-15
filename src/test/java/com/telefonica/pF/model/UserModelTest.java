package com.telefonica.pF.model;

import org.junit.Assert;
import org.junit.Test;

public class UserModelTest {
    @Test
    public void ControlName(){
        UserModel userErrors = new UserModel("patin1", "piti2", "universidad de la vida", "victoriafede@@]ce", "@", "RULE_USER");
        Assert.assertNull(userErrors.getUserName());
    }

    @Test
    public void ControlSurname(){
        UserModel userErrors = new UserModel("patin1", "piti2", "universidad de la vida", "victoriafede@@]ce", "@", "RULE_USER");
        Assert.assertNull(userErrors.getUserSurname());
    }

    @Test
    public void ControlEmail(){
        UserModel userErrors = new UserModel("patin1", "piti2", "universidad de la vida", "victoriafede@@]ce", "@", "RULE_USER");
        Assert.assertNull(userErrors.getUserEmail());
    }

    @Test
    public void ControlAllOk(){
        UserModel userErrors = new UserModel("Victoria", "Federica", "universidad de la vida", "victoriafede@patinpiti.es", "coletas", "RULE_USER");
        Assert.assertNotNull(userErrors.getUserName());
        Assert.assertNotNull(userErrors.getUserSurname());
        Assert.assertNotNull(userErrors.getUserEmail());
        Assert.assertNotNull(userErrors.getUserPassword());
    }
    
}
