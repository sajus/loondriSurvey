package com.cybage.uipiggy.service;

import java.util.List;

import com.cybage.uipiggy.dao.ResponseDao;
import com.cybage.uipiggy.dao.ResponseDaoHibernate;
import com.cybage.uipiggy.model.Response;

public class ResponseServiceImpl implements ResponseService{
	
	ResponseDao responseDao = new ResponseDaoHibernate();

	public ResponseDao getResponseDao() {
		return responseDao;
	}

	public void setResponseDao(ResponseDao responseDao) {
		this.responseDao = responseDao;
	}
	
	public void setResponse(Response response) throws Exception{
		
		responseDao.setResponse(response);
		
	}
	
	public List<Response> getResponseByEmpAndSurvey(Long empId,Long surveyId)throws Exception{
		List<Response>responseList = responseDao.getResponseByEmpAndSurvey(empId,surveyId);
		return responseList;
	}

}
