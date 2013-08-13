package com.cybage.uipiggy.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import static javax.persistence.GenerationType.IDENTITY;


@Entity
@Table(name = "options")
public class Options {

	Long id;
	Long categoriesid;
	String optionvalue;
	String answer;
	Long questionid;
	
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	
	@Column(name = "categoriesid")
	public Long getCategoriesid() {
		return categoriesid;
	}
	public void setCategoriesid(Long categoriesid) {
		this.categoriesid = categoriesid;
	}
	
	
	@Column(name = "optionvalue")
	public String getOptionvalue() {
		return optionvalue;
	}
	public void setOptionvalue(String optionvalue) {
		this.optionvalue = optionvalue;
	}
	
	@Column(name = "questionid")
	public Long getQuestionid() {
		return questionid;
	}
	public void setQuestionid(Long questionid) {
		this.questionid = questionid;
	}
	
	
	@Column(name = "answer")
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	
	
	
	
}
