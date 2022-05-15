package com.telefonica.pF.model;

import java.util.Objects;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Table("USER")
public class UserModel {
    @Id
	private String id;

	private String userName;
    private String userSurname;
    private String userStudies;
    private String userEmail;
    private String userPassword;
    private String role;

    public UserModel(String id, String userName, String userSurname, String userStudies, String userEmail, String userPassword, String role) {
		super();
		this.id = id;
		this.userName = userName;
		this.userSurname = userSurname;
        this.userStudies = userStudies;
		this.userEmail = userEmail;
		this.userPassword = userPassword;
		this.setRole(role);

	}

    public UserModel(String userName, String userSurname, String userStudies, String userEmail, String userPassword, String role) {
		super();

		this.userName = userName;
		this.userSurname = userSurname;
        this.userStudies = userStudies;
		this.userEmail = userEmail;
		this.userPassword = userPassword;
		this.setRole(role);

	}

	public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public UserModel() {
		super();
	}

    public String getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserSurname() {
        return userSurname;
    }

    public void setUserSurname(String userSurname) {
        this.userSurname = userSurname;
    }

    public String getUserStudies() {
        return userStudies;
    }

    public void setUserStudies(String userStudies) {
        this.userStudies = userStudies;
    }



    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof UserModel)) {
            return false;
        }
        UserModel userModel = (UserModel) o;
        return Objects.equals(id, userModel.id) && Objects.equals(userName, userModel.userName) && Objects.equals(userSurname, userModel.userSurname) && Objects.equals(userStudies, userModel.userStudies) && Objects.equals(userEmail, userModel.userEmail) && Objects.equals(userPassword, userModel.userPassword) && Objects.equals(role, userModel.role);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userName, userSurname, userStudies, userEmail, userPassword, role);
    }
    

}
