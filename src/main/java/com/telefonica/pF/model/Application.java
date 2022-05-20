package com.telefonica.pF.model;

import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Table("APPLICATIONS")
public class Application {

    @Id
    private String appId;

    private String offerId;
    private String userId;


    public Application() {}


    public Application(String appId, String offerId, String userId) {
        this.appId = appId;
        this.offerId = offerId;
        this.userId = userId;
    }


    public String getAppId() {
        return this.appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public String getOfferId() {
        return this.offerId;
    }

    public void setOfferId(String offerId) {
        this.offerId = offerId;
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
        if (!(o instanceof Application)) {
            return false;
        }
        Application application = (Application) o;
        return Objects.equals(appId, application.appId) && Objects.equals(offerId, application.offerId) && Objects.equals(userId, application.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(appId, offerId, userId);
    }
    
}
