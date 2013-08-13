package com.cybage.uipiggy.dao;

import java.util.List;

import com.cybage.uipiggy.model.Survey;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.Transactional;

public class SurveyDaoHibernate extends HibernateDaoSupport implements SurveyDao {

	private Log logger = LogFactory.getLog(this.getClass());
	
	public Long createSurvey(Survey s) throws Exception
	{
		logger.info("in survey DAO");
		getHibernateTemplate().saveOrUpdate(s); 
		Long sid = s.getId();
		return sid;
	}
	
	public List<Survey> getAllSurveyList()  throws Exception
	{
		List<Survey> surveyList = getHibernateTemplate().find("FROM Survey");
		logger.info("in survey DAO to get list"+surveyList.size());
		return surveyList;
	}
	
	public List<Survey>getSurveyById(Long surveyId) throws Exception{
		
		List<Survey> surveyListById = getHibernateTemplate().findByNamedParam("FROM Survey where id =:id","id",surveyId);
		return surveyListById;
		
	}
	
	public Boolean updateSurvey(String queryString) throws Exception{
		getHibernateTemplate().bulkUpdate(queryString);
		return true;
	}
}
