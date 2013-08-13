package com.cybage.uipiggy.model;

import static javax.persistence.GenerationType.IDENTITY;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "categories")
public class Categories {

	private Long id;
	private Long questionid;
	private String categoryname;
	private String categorytype;
	
	
	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id")
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column(name = "questionid")
	public Long getQuestionid() {
		return questionid;
	}
	public void setQuestionid(Long questionid) {
		this.questionid = questionid;
	}
	
	@Column(name = "categoryname")
	public String getCategoryname() {
		return categoryname;
	}
	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}
	
	public String getCategorytype() {
		return categorytype;
	}
	public void setCategorytype(String categorytype) {
		this.categorytype = categorytype;
	}
}
