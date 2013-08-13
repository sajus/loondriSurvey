package com.cybage.uipiggy.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "users")
public class Users {
	
	private Long empid;
	private String fisrtname;
	private String lastname;
	private String userpassword;
	private Long designationid;
	private String accesslevel;
	private String email;
	private String gender;
	private String status;
	

	@Id
	@Column(name = "empid")
	public Long getEmpid() {
		return empid;
	}
	public void setEmpid(Long empid) {
		this.empid = empid;
	}
	
	public String getUserpassword() {
		return userpassword;
	}
	
	@Column(name = "userpassword")
	public void setUserpassword(String userpassword) {
		this.userpassword = userpassword;
	}
	
	@Column(name = "firstname")
	public String getFisrtname() {
		return fisrtname;
	}
	public void setFisrtname(String fisrtname) {
		this.fisrtname = fisrtname;
	}
	
	
	@Column(name = "lastname")
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	
	@Column(name = "designationid")
	public Long getDesignationid() {
		return designationid;
	}
	public void setDesignationid(Long designationid) {
		this.designationid = designationid;
	}
	
	@Column(name = "accesslevel")
	public String getAccesslevel() {
		return accesslevel;
	}
	public void setAccesslevel(String accesslevel) {
		this.accesslevel = accesslevel;
	}
	@Column(name = "email")
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	@Column(name = "gender")
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	
	@Column(name = "status")
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
