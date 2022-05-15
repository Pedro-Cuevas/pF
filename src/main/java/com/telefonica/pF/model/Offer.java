package com.telefonica.pF.model;

import java.time.LocalDate;
import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Table("OFFER")
public class Offer {
    @Id
    private String id;

    private String offerName;
    private LocalDate dateBegining;
    private LocalDate dateEnd;
    private String offerDescription;
    private String offerAvailable;



    public Offer() {}


    public Offer(String id, String offerName, LocalDate dateBegining, LocalDate dateEnd, String offerDescription, String offerAvailable) {
        this.id = id;
        this.offerName = offerName;
        this.dateBegining = dateBegining;
        this.setDateEnd(dateEnd);
        this.offerDescription = offerDescription;
        this.offerAvailable = offerAvailable;
    }



    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOfferName() {
        return this.offerName;
    }

    public void setOfferName(String offerName) {
        this.offerName = offerName;
    }

    public LocalDate getDateBegining() {
        return this.dateBegining;
    }

    public void setDateBegining(LocalDate dateBegining) {
        this.dateBegining = dateBegining;
    }

    public LocalDate getDateEnd() {
        return this.dateEnd;
    }

    public void setDateEnd(LocalDate dateEnd) {
        if(dateBegining.isBefore(dateEnd)){
            this.dateEnd = dateEnd;
        }else{
            this.dateEnd = null;
        }
    }

    public String getOfferDescription() {
        return this.offerDescription;
    }

    public void setOfferDescription(String offerDescription) {
        this.offerDescription = offerDescription;
    }

    public String getOfferAvailable() {
        return offerAvailable;
    }

    public void setOfferAvailable(String offerAvailable) {
        this.offerAvailable = offerAvailable;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Offer)) {
            return false;
        }
        Offer offer = (Offer) o;
        return Objects.equals(id, offer.id) && Objects.equals(offerName, offer.offerName) && Objects.equals(dateBegining, offer.dateBegining) && Objects.equals(dateEnd, offer.dateEnd) && Objects.equals(offerDescription, offer.offerDescription) && Objects.equals(offerAvailable, offer.offerAvailable);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, offerName, dateBegining, dateEnd, offerDescription, offerAvailable);
    }


}