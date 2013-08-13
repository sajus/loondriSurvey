package com.cybage.uipiggy.model;



import java.util.Date;



import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import static javax.persistence.GenerationType.IDENTITY;


@Entity
@Table(name = "questions")
public class Questions {

	
	
	Long id;
	Long surveyid;
	String questionvalue;
	String questiontype;
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id")
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	
	@Column(name = "surveyid")
	public Long getSurveyid() {
		return surveyid;
	}
	
	public void setSurveyid(Long surveyid) {
		this.surveyid = surveyid;
	}
	
	
	@Column(name = "questionvalue")
	public String getQuestionvalue() {
		return questionvalue;
	}
	
	public void setQuestionvalue(String questionvalue) {
		this.questionvalue = questionvalue;
	}
	
	
	@Column(name = "questiontype")
	public String getQuestiontype() {
		return questiontype;
	}
	
	public void setQuestiontype(String questiontype) {
		this.questiontype = questiontype;
	}
	
	
	
}
