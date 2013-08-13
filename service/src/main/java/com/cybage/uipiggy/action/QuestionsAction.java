package com.cybage.uipiggy.action;

import java.io.IOException;
import java.util.Date;
import java.util.Iterator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.json.JSONObject;

import com.cybage.uipiggy.model.Questions;
import com.cybage.uipiggy.service.QuestionsService;
import com.cybage.uipiggy.service.QuestionsServiceImpl;
import com.cybage.uipiggy.utils.CommonUtil;
import com.cybage.uipiggy.utils.JsonUtil;

import com.opensymphony.xwork2.Action;

public class QuestionsAction implements Action, ServletRequestAware,ServletResponseAware{
	
	QuestionsService questionsService = new QuestionsServiceImpl();
	private Log logger = LogFactory.getLog(this.getClass());
	private HttpServletRequest request;
	private HttpServletResponse response;
	Questions questions;
	
	
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
	
	public String execute(){
		
		logger.info("QuestionsAction execute()");
		
		return "success";
	}
	
	
	public QuestionsService getQuestionsService() {
		return questionsService;
	}
	public void setQuestionsService(QuestionsService questionsService) {
		this.questionsService = questionsService;
	}
	
	
	public void createQuestions(Long id)
	{
		try
		{
		String str = CommonUtil.getBody(getServletRequest());
		JSONObject jsonObj = new JSONObject(str);
		
		
		String type=jsonObj.get("qtype").toString();
		String value=jsonObj.get("qvalue").toString();
		Long sid=Long.valueOf(jsonObj.get("sid").toString());
		
		
		
		questions=new Questions();
		questions.setQuestiontype(type);
		questions.setQuestionvalue(value);
		questions.setSurveyid(sid);
		
		
			Long qid=questionsService.createQuestions(questions);
			
			logger.info("questions action");
			
			getServletResponse().setContentType("application/json");
			getServletResponse().setCharacterEncoding("UTF-8");
			getServletResponse().getWriter().write(qid.toString());
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
			
			
		}
		catch(Exception e)
		{
			logger.error("Exception in action",e);
				
		}
		
	}
	
	public void getQuestionById()
	{
		
		try
		{
			String str = CommonUtil.getBody(getServletRequest());
			JSONObject jsonObj = new JSONObject(str);
			
			Long qid=Long.valueOf(jsonObj.get("id").toString());
			Questions q=questionsService.getQuestionById(qid);
			String qJson=JsonUtil.getQuestionJson(q);
			
			logger.info("questions action");
			
			getServletResponse().setContentType("application/json");
			getServletResponse().setCharacterEncoding("UTF-8");
			getServletResponse().getWriter().write(qJson);
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
			
			
		}
		catch(Exception e)
		{
			logger.error("Exception in action",e);
				
		}
		
		
		
	}
	
	public void updateQuestions() throws Exception
	{
		String str = CommonUtil.getBody(getServletRequest());
		JSONObject j = new JSONObject(str);
		Boolean resp = false;
		 Iterator<String> itr = j.keys();
                 
         String query = "Update Questions set ";
         String whereClause = " where";
         int counter =0; 
         while(itr.hasNext())
         {
               String key = itr.next();
               System.out.println(key);
               if(key.equalsIgnoreCase("id"))
               {
                      
                      whereClause+=(" id="+j.getInt(key));
               }
               else
               {
                      if(counter>=1)
                             query+=(" , "+key+"="+"'"+j.getString(key)+"'");
                      else
                             query+=(key+"="+"'"+j.getString(key)+"'");
                      
                      counter++;
               }
               
         }
         
         query+=whereClause;
         
         resp = questionsService.updateQuestions(query);
       
        getServletResponse().setContentType("application/json");
		getServletResponse().setCharacterEncoding("UTF-8");
		
		 getServletResponse().getWriter().write("{isUpdated:"+resp+"}");
		
			
		getServletResponse().getWriter().flush();
		getServletResponse().getWriter().close();
        
	}
		
	

}
