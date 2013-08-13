package com.cybage.uipiggy.dao;

import java.util.List;

import com.cybage.uipiggy.model.Response;

public interface ResponseDao {
	
	public void setResponse(Response response) throws Exception;
	public List<Response> getResponseByEmpAndSurvey(Long empId,Long surveyId)throws Exception;

}
