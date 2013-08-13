package com.cybage.uipiggy.model;



import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "response")
public class Response implements Serializable{
	
	
	private Long empid;
	private Long categoryid;
	private Long questionid;
	private Long surveyid;
	private String selectedvalue;
	
	@Id	
	@Column(name = "empid")
	public Long getEmpid() {
		return empid;
	}
	public void setEmpid(Long empid) {
		this.empid = empid;
	}
	
	@Column(name = "categoryid")
	public Long getCategoryid() {
		return categoryid;
	}
	public void setCategoryid(Long categoryid) {
		this.categoryid = categoryid;
	}
	
	
	@Id
	@Column(name = "questionid")
	public Long getQuestionid() {
		return questionid;
	}
	public void setQuestionid(Long questionid) {
		this.questionid = questionid;
	}
	
	@Id
	@Column(name = "surveyid")
	public Long getSurveyid() {
		return surveyid;
	}
	public void setSurveyid(Long surveyid) {
		this.surveyid = surveyid;
	}
	
	@Column(name = "selectedvalue")
	public String getSelectedvalue() {
		return selectedvalue;
	}
	public void setSelectedvalue(String selectedvalue) {
		this.selectedvalue = selectedvalue;
	}
	
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((empid == null) ? 0 : empid.hashCode());
		result = prime * result
				+ ((questionid == null) ? 0 : questionid.hashCode());
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
		Response other = (Response) obj;
		if (empid == null) {
			if (other.empid != null)
				return false;
		} else if (!empid.equals(other.empid))
			return false;
		if (questionid == null) {
			if (other.questionid != null)
				return false;
		} else if (!questionid.equals(other.questionid))
			return false;
		if (surveyid == null) {
			if (other.surveyid != null)
				return false;
		} else if (!surveyid.equals(other.surveyid))
			return false;
		return true;
	}
	

}
