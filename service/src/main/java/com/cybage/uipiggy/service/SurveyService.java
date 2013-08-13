/**
 * 
 */
package com.cybage.uipiggy.service;

import java.util.List;

import com.cybage.uipiggy.model.Survey;


public interface SurveyService {

	public Long createOrUpdateSurvey(Survey survey) throws Exception;
	public List<Survey> getAllSurveyList()  throws Exception;
	public List<Survey>getSurveyById(Long surveyId)  throws Exception;
}
