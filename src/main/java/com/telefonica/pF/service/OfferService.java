package com.telefonica.pF.service;

import com.telefonica.pF.join.OfferAppJoin;
import com.telefonica.pF.model.Offer;

public interface OfferService {
    Iterable<Offer> getOffers(String offerAvailable);
    Iterable<OfferAppJoin> getOffersWithApplication(String id);
    Iterable<OfferAppJoin> getAllOffers();
    Iterable<OfferAppJoin> getEmptyOffers();
    Offer getOffer(String id);
    void deleteOffer(String id); 
    Offer insertOffer(Offer offer);
    Offer updateOffer(String id, Offer offer);   
}
