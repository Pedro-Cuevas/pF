package com.telefonica.pF.service.implementation;

import com.telefonica.pF.join.OfferAppJoin;
import com.telefonica.pF.model.Offer;
import com.telefonica.pF.repository.OfferRepository;
import com.telefonica.pF.service.OfferService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OfferServiceImplementation implements OfferService{
    @Autowired
    private OfferRepository offerRepository;

    @Override
    public Iterable<Offer> getOffers(String offerAvailable){
        if(offerAvailable == null){
            return offerRepository.findAll();
        } else {
            return offerRepository.getOffersAvailable(offerAvailable);
        }
        
    }

    @Override
    public Iterable<OfferAppJoin> getOffersWithApplication(String id){
        return offerRepository.getOffersWithApplication(id);
    }

    @Override
    public Iterable<OfferAppJoin> getAllOffers(){
        return offerRepository.getAllOffers();
    }
    
    @Override
    public Iterable<OfferAppJoin> getEmptyOffers(){
        return offerRepository.getEmptyOffers();
    }

    @Override
    public Offer getOffer(String id){
        Offer response = null;
        if(offerRepository.existsById(id)){
            Iterable<Offer> offers = offerRepository.getOfferByID(id);
            for(Offer offer : offers){
                response = offer;
            }
            return response;            
        }
        return response;
    }

    @Override
    public void deleteOffer(String id){
        offerRepository.deleteById(id);
    }

    @Override
    public Offer insertOffer(Offer offer){
        return offerRepository.save(offer);
    }

    @Override
    public Offer updateOffer(String id, Offer offer){
        if(offerRepository.existsById(id)){
            return offerRepository.save(offer);
        } else {
            return null;
        }
        
    }
    
}
