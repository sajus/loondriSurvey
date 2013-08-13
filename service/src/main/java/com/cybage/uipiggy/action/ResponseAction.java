package com.cybage.uipiggy.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.json.JSONObject;

import com.cybage.uipiggy.model.Participants;
import com.cybage.uipiggy.model.Response;
import com.cybage.uipiggy.service.ParticipantsService;
import com.cybage.uipiggy.service.ParticipantsServiceImpl;
import com.cybage.uipiggy.service.ResponseService;
import com.cybage.uipiggy.service.ResponseServiceImpl;
import com.cybage.uipiggy.utils.CommonUtil;
import com.cybage.uipiggy.utils.JsonUtil;
import com.opensymphony.xwork2.Action;

public class ResponseAction implements Action, ServletRequestAware,ServletResponseAware{
	
	private Log logger = LogFactory.getLog(this.getClass());
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	ResponseService responseService = new ResponseServiceImpl();
	
	
	private ParticipantsService participantsService = new ParticipantsServiceImpl();
	
	
	public ParticipantsService getParticipantsService() {
		return participantsService;
	}


	public void setParticipantsService(ParticipantsService participantsService) {
		this.participantsService = participantsService;
	}
	

	public void setServletResponse(HttpServletResponse response) {
		this.response = response;

	}

	public HttpServletResponse getServletResponse() {
		return this.response;
	}

	public void setServletRequest(HttpServletRequest request) {
		this.request = request;

	}

	public HttpServletRequest getServletRequest() {
		return this.request;
	}
	
	public HttpServletRequest getRequest() {
		return request;
	}

	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}

	public HttpServletResponse getResponse() {
		return response;
	}

	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}
	
	public ResponseService getResponseService() {
		return responseService;
	}

	public void setResponseService(ResponseService responseService) {
		this.responseService = responseService;
	}
	
	public String execute(){
		
		logger.info("ResponseAction.execute()");
		
		return "success";
	}
	
	public void setResponse() throws Exception{
		
		try
		{
			String str = CommonUtil.getBody(getServletRequest());
			JSONObject jsonObj = new JSONObject(str);
	
			Long empId=jsonObj.getLong("empid");
			Long surveyId=jsonObj.getLong("surveyid");
			Long categoryId=jsonObj.getLong("categoryid");
			Long questionId=jsonObj.getLong("questionid");
			String selectedValue = jsonObj.getString("selectedvalue");
			String status =  jsonObj.getString("status");
		
			Response  response = new Response();
			response.setEmpid(empId);
			response.setSurveyid(surveyId);
			response.setCategoryid(categoryId);
			response.setQuestionid(questionId);
			response.setSelectedvalue(selectedValue);
			
			Participants p=new Participants();
			
			p.setEmpid(9804L);
			p.setStatus("Complete");
			p.setSurveyid(1L);
			
			logger.info("In method setResponse()");
			responseService.setResponse(response);
			
			participantsService.saveParticipantsStatus(p);
						
			logger.info("writing response from action");
			getServletResponse().setContentType("application/json");
			getServletResponse().setCharacterEncoding("UTF-8");
			getServletResponse().getWriter().write("{status:"+status+"}");
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
				
		}
		
	}
	
	public void getResponseByEmpAndSurvey() throws Exception{
		
		try{
				String str = CommonUtil.getBody(getServletRequest());
				JSONObject jsonObj = new JSONObject(str);
				Long empId=jsonObj.getLong("empid");
				Long surveyId=jsonObj.getLong("surveyid");
				String status = jsonObj.getString("status");
		
				List<Response>responseList = responseService.getResponseByEmpAndSurvey(empId,surveyId);
				String jsonresp=JsonUtil.getResponseListJson(responseList,status);
				logger.info("writing response from action");
				getServletResponse().setContentType("application/json");
				getServletResponse().setCharacterEncoding("UTF-8");
				getServletResponse().getWriter().write(jsonresp);
				getServletResponse().getWriter().flush();
				getServletResponse().getWriter().close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		
		
	}

}
