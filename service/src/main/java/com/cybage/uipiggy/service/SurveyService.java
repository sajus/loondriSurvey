/**
 * 
 */
package com.cybage.uipiggy.service;

import java.util.List;

import com.cybage.uipiggy.model.Survey;


public interface SurveyService {

	public Long createSurvey(Survey survey) throws Exception;
	public List<Survey> getAllSurveyList()  throws Exception;
	public List<Survey>getSurveyById(Long surveyId)  throws Exception;
	public Boolean updateSurvey(String queryString) throws Exception;
}
