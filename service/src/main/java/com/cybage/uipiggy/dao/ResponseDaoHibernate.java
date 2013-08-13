package com.cybage.uipiggy.dao;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.cybage.uipiggy.model.Response;
import com.cybage.uipiggy.model.Participants;

import com.cybage.uipiggy.service.ParticipantsService;
import com.cybage.uipiggy.service.ParticipantsServiceImpl;

import com.cybage.uipiggy.utils.ApplicationContextUtils;


public class ResponseDaoHibernate extends HibernateDaoSupport implements ResponseDao {
	
	private Log logger = LogFactory.getLog(this.getClass());
	


	public void setResponse(Response response) throws Exception{
		
		logger.info("in ResponseDAOHib");
		
		getHibernateTemplate().saveOrUpdate(response); 
		
		}
	
	public List<Response> getResponseByEmpAndSurvey(Long empId,Long surveyId)throws Exception{
		Object[] params  = {empId ,surveyId};
		List<Response>responseList =getHibernateTemplate().find("FROM Response where empid=? AND surveyid=?",params) ;
		return responseList;
	}


}
