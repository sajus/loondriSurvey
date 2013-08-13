package com.cybage.uipiggy.dao;

import java.util.List;

import com.cybage.uipiggy.model.Survey;


public interface SurveyDao {
	
	public Long createOrUpdateSurvey(Survey s) throws Exception;
	public List<Survey> getAllSurveyList()  throws Exception;
	public List<Survey>getSurveyById(Long surveyId) throws Exception;
}
