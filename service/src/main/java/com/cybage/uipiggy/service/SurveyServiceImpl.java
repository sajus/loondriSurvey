package com.cybage.uipiggy.service;

import java.util.List;

import com.cybage.uipiggy.dao.SurveyDao;
import com.cybage.uipiggy.dao.SurveyDaoHibernate;
import com.cybage.uipiggy.model.Survey;

public class SurveyServiceImpl implements SurveyService{
	
	SurveyDao surveyDao= new SurveyDaoHibernate();
	
	public SurveyDao getSurveyDao() {
		return surveyDao;
	}

	public void setSurveyDao(SurveyDao surveyDao) {
		this.surveyDao = surveyDao;
	}

	public Long createOrUpdateSurvey(Survey survey) throws Exception
	{
		
		Long id=surveyDao.createOrUpdateSurvey(survey);
		
		return id;
	}
	
	public List<Survey> getAllSurveyList()  throws Exception
	{
		List<Survey> surveyList=surveyDao.getAllSurveyList();
		return surveyList;
		
	}
	
	public List<Survey>getSurveyById(Long surveyId)  throws Exception{
		
		List<Survey> surveyListById=surveyDao.getSurveyById(surveyId);
		return surveyListById;
		
	}

}
