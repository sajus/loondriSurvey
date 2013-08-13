package com.cybage.uipiggy.service;

import com.cybage.uipiggy.model.Questions;

public interface QuestionsService {

	public Long createQuestions(Questions questions) throws Exception;
	public Questions getQuestionById(Long qid) throws Exception;
	public Boolean updateQuestions(String queryString) throws Exception;
	
}
