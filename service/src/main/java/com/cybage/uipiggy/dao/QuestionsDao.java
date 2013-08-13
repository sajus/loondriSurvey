
package com.cybage.uipiggy.dao;

import com.cybage.uipiggy.model.Questions;


public interface QuestionsDao {
	
	public Long createQuestions(Questions q) throws Exception;
	public Questions getQuestionById(Long qid) throws Exception;
	public Boolean updateQuestions(String queryString) throws Exception;

}

