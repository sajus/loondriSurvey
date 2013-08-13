package com.cybage.uipiggy.model;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "participants")
public class Participants implements Serializable
{
	//private Long id;
	private Long empid;
	private Long surveyid;
	private String status;
	
	
	/*@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}*/
	
	@Id
	@Column(name = "empid")
	public Long getEmpid() {
		return empid;
	}
	public void setEmpid(Long empid) {
		this.empid = empid;
	}
	
	@Id
	@Column(name = "surveyid")
	public Long getSurveyid() {
		return surveyid;
	}
	public void setSurveyid(Long surveyid) {
		this.surveyid = surveyid;
	}
	
	
	@Column(name = "status")
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((empid == null) ? 0 : empid.hashCode());
		result = prime * result
				+ ((surveyid == null) ? 0 : surveyid.hashCode());
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Participants other = (Participants) obj;
		if (empid == null) {
			if (other.empid != null)
				return false;
		} else if (!empid.equals(other.empid))
			return false;
		if (surveyid == null) {
			if (other.surveyid != null)
				return false;
		} else if (!surveyid.equals(other.surveyid))
			return false;
		return true;
	}
	
	
		
	

}
