package com.telefonica.pF.model;

import java.time.LocalDate;

import org.junit.Assert;
import org.junit.Test;

public class OfferTest {
    @Test
    public void datesNotInOrder(){
        Offer offer = new Offer("1", "amigo", LocalDate.of(2022, 1, 1), LocalDate.of(2019,10,10), "un amigo para Pedro", "Disponible");
        Assert.assertNull(offer.getDateEnd());
    }

    @Test
    public void datesInOrder(){
        Offer offer = new Offer("1", "amigo", LocalDate.of(2022, 1, 1), LocalDate.of(2032,10,10), "un amigo para Pedro", "Disponible");
        Assert.assertNotNull(offer.getDateEnd());
    }
    
}
