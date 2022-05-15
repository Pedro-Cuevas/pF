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
    private String id;

    private String offerId;
    private String userId;


    public Application() {}


    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
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
        return Objects.equals(id, application.id) && Objects.equals(offerId, application.offerId) && Objects.equals(userId, application.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, offerId, userId);
    }
    
}
