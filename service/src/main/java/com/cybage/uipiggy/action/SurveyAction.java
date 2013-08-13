package com.cybage.uipiggy.action;


import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.json.JSONObject;

import com.cybage.uipiggy.model.Survey;
import com.cybage.uipiggy.service.SurveyService;
import com.cybage.uipiggy.service.SurveyServiceImpl;
import com.cybage.uipiggy.utils.CommonUtil;
import com.cybage.uipiggy.utils.JsonUtil;
import com.opensymphony.xwork2.Action;

public class SurveyAction implements Action, ServletRequestAware,ServletResponseAware{
	
	SurveyService surveyService = new SurveyServiceImpl();

	private Log logger = LogFactory.getLog(this.getClass());
	private HttpServletRequest request;
	private HttpServletResponse response;
	Survey survey;
	
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
	
	
	public SurveyService getSurveyService() {
		return surveyService;
	}

	public void setSurveyService(SurveyService surveyService) {
		this.surveyService = surveyService;
	}

	public String execute(){
		
		logger.info("SurveyAction.execute()");
		return "success";
	}
	
	public void createSurvey(Long id){
		
		try
		{
			String str = CommonUtil.getBody(getServletRequest());
			JSONObject jsonObj = new JSONObject(str);
			
			String description=jsonObj.getString("description");
			String title=jsonObj.getString("title");
			String sdate=jsonObj.getString("startdate");
			String edate=jsonObj.getString("enddate");
			
			Date startDate= CommonUtil.parseDate(sdate,"yyyy-MM-dd HH:mm:ss"); 
			Date endDate= CommonUtil.parseDate(edate,"yyyy-MM-dd HH:mm:ss"); 
		
						
			survey=new Survey();
			
			survey.setDescription(description);
			survey.setTitle(title);
			survey.setStartdate(startDate);
			survey.setEnddate(endDate);
			
		
				Long sid=surveyService.createSurvey(survey);
				
				logger.info("Survey action");
				
				getServletResponse().setContentType("application/json");
				getServletResponse().setCharacterEncoding("UTF-8");
				getServletResponse().getWriter().write("{id:"+sid+"}");
				getServletResponse().getWriter().flush();
				getServletResponse().getWriter().close();
				
				
			}
			catch(Exception e)
			{
				logger.error("Exception in action",e);
					
			}
			
	}
	public void getAllSurvey(){
		logger.info("getAllSurvey");
		
		try
		{
			List<Survey> surveyList=surveyService.getAllSurveyList();
			String jsonresp=JsonUtil.getSurveyListJson(surveyList);
			logger.info("writing response from action");
			
			getServletResponse().setContentType("application/json");
			getServletResponse().setCharacterEncoding("UTF-8");
			getServletResponse().getWriter().write(jsonresp);
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
			
			
		}
		catch(Exception e)
		{
			logger.error("Exception in action",e);
				
		}
		
	}
	
	public void getSurveyById()
	{
		try
		{
			String jsonresp = "{isValidSurvey:false}";
			String str = CommonUtil.getBody(getServletRequest());
			JSONObject jsonObj = new JSONObject(str);
			Long surveyId=jsonObj.getLong("id");
			List<Survey> surveyListById=surveyService.getSurveyById(surveyId);
			Date endDate = surveyListById.get(0).getEnddate();
			Date currDate = new Date();
			if(currDate.compareTo(endDate)<=0){
				jsonresp=JsonUtil.getSurveyListByIdJson(surveyListById);
			}
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
	
	public void updateSurvey() throws Exception
	{
				String str = CommonUtil.getBody(getServletRequest());
				JSONObject j = new JSONObject(str);
				Boolean resp = false;
				 Iterator<String> itr = j.keys();
		                 
		         String query = "Update Survey set ";
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
		         
		         resp = surveyService.updateSurvey(query);
		       
		        getServletResponse().setContentType("application/json");
				getServletResponse().setCharacterEncoding("UTF-8");
				
				 getServletResponse().getWriter().write("{isUpdated:"+resp+"}");
				
					
				getServletResponse().getWriter().flush();
				getServletResponse().getWriter().close();
	}

}
