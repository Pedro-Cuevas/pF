package com.telefonica.pF.join;

import java.time.LocalDate;
import java.util.Objects;

public class OfferAppJoin {
    private String id;
    private String offerName;
    private LocalDate dateBegining;
    private LocalDate dateEnd;
    private String offerDescription;
    private String offerAvailable;
    private String appId;
    private String userId;


    public OfferAppJoin(String id, String offerName, LocalDate dateBegining, LocalDate dateEnd, String offerDescription, String offerAvailable, String appId, String userId) {
        this.id = id;
        this.offerName = offerName;
        this.dateBegining = dateBegining;
        this.dateEnd = dateEnd;
        this.offerDescription = offerDescription;
        this.offerAvailable = offerAvailable;
        this.appId = appId;
        this.userId = userId;
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
        this.dateEnd = dateEnd;
    }

    public String getOfferDescription() {
        return this.offerDescription;
    }

    public void setOfferDescription(String offerDescription) {
        this.offerDescription = offerDescription;
    }

    public String getOfferAvailable() {
        return this.offerAvailable;
    }

    public void setOfferAvailable(String offerAvailable) {
        this.offerAvailable = offerAvailable;
    }

    public String getAppId() {
        return this.appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof OfferAppJoin)) {
            return false;
        }
        OfferAppJoin offerAppJoin = (OfferAppJoin) o;
        return Objects.equals(id, offerAppJoin.id) && Objects.equals(offerName, offerAppJoin.offerName) && Objects.equals(dateBegining, offerAppJoin.dateBegining) && Objects.equals(dateEnd, offerAppJoin.dateEnd) && Objects.equals(offerDescription, offerAppJoin.offerDescription) && Objects.equals(offerAvailable, offerAppJoin.offerAvailable) && Objects.equals(appId, offerAppJoin.appId) && Objects.equals(userId, offerAppJoin.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, offerName, dateBegining, dateEnd, offerDescription, offerAvailable, appId, userId);
    }
    
}
