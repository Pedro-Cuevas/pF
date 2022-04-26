package com.telefonica.pF.repository;

import com.telefonica.pF.model.Offer;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface OfferRepository extends CrudRepository<Offer,String> {
    @Query("SELECT * FROM OFFER WHERE OFFER_AVAILABLE= :offerAvailable")
    public Iterable<Offer> getOffersAvailable(String offerAvailable);

    @Query("SELECT * FROM OFFER WHERE OFFER.ID= :id")
    public Iterable<Offer> getOfferByID(String id);

    @Query("SELECT * FROM OFFER INNER JOIN APPLICATIONS ON OFFER.ID=APPLICATIONS.OFFER_ID WHERE APPLICATIONS.USER_ID= :id")
    public Iterable<Offer> getOffersWithApplication(String id);

    @Query("SELECT * FROM OFFER LEFT OUTER JOIN APPLICATIONS ON OFFER.ID=APPLICATIONS.OFFER_ID")
    public Iterable<Offer> getAllOffers();

    @Query("SELECT * FROM OFFER LEFT OUTER JOIN APPLICATIONS ON OFFER.ID=APPLICATIONS.OFFER_ID WHERE APPLICATIONS.OFFER_ID IS NULL")
    public Iterable<Offer> getEmptyOffers();
}

