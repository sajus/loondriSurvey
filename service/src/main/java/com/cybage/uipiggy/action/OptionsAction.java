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

import com.cybage.uipiggy.model.Options;
import com.cybage.uipiggy.service.OptionService;
import com.cybage.uipiggy.service.OptionServiceImpl;
import com.cybage.uipiggy.utils.CommonUtil;
import com.cybage.uipiggy.utils.JsonUtil;

import com.opensymphony.xwork2.Action;

public class OptionsAction implements Action, ServletRequestAware,ServletResponseAware{
	
	OptionService optionService=new OptionServiceImpl();
	private Log logger = LogFactory.getLog(this.getClass());
	private HttpServletRequest request;
	private HttpServletResponse response;
	Options option;
	
	public OptionService getOptionService() {
		return optionService;
	}
	public void setOptionService(OptionService optionService) {
		this.optionService = optionService;
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
	
	
	public String execute(){
		
		logger.info("optionsAction execute()");
		return "success";
	}
	
		
	public void createOptions(Long id)
	{
		
		try
		{
			String str = CommonUtil.getBody(getServletRequest());
			JSONObject jsonObj = new JSONObject(str);
			String answer= jsonObj.get("answer").toString();
			String optvalue=jsonObj.get("optionvalue").toString();
			Long questionId=Long.valueOf(jsonObj.get("questionid").toString());
			Long categoriesid=Long.valueOf(jsonObj.get("categoriesid").toString());
		
			option=new Options();
			
			option.setAnswer(answer);
			option.setOptionvalue(optvalue);
			option.setCategoriesid(questionId);
			option.setQuestionid(categoriesid);
			
		
			Long oid=optionService.createOptions(option);
			
			logger.info("options action"+oid);
			
			getServletResponse().setContentType("text/plain");
			getServletResponse().setCharacterEncoding("UTF-8");
			getServletResponse().getWriter().write("{id:"+oid+"}");
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
			
			
		}
		catch(Exception e)
		{
			logger.error("Exception in action",e);
				
		}
		
		
	}
	
	public void getOptionsByCategoryId()
	{
		
		try
		{
			String str = CommonUtil.getBody(getServletRequest());
			JSONObject jsonObj = new JSONObject(str);
			Long cid=Long.valueOf(jsonObj.get("categoriesid").toString());
			List<Options> optList=optionService.getOptionsByCategoryId(cid);
			String jsonResp=JsonUtil.getOptionListJson(optList);
			
			logger.info(jsonResp);
			getServletResponse().setContentType("application/json");
			getServletResponse().setCharacterEncoding("UTF-8");
			getServletResponse().getWriter().write(jsonResp);
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
			
			
		}
		catch(Exception e)
		{
			logger.info(e.getMessage());
		}
		
	}
	
	public void getOptionsByQuestionsId()
	{
		
		try
		{
			String str = CommonUtil.getBody(getServletRequest());
			JSONObject jsonObj = new JSONObject(str);
			Long qid=Long.valueOf(jsonObj.get("questionid").toString());
			
			List<Options> optList=optionService.getOptionsByQuestionsId(qid);
			String jsonResp=JsonUtil.getOptionListJson(optList);
			
			logger.info(jsonResp);
			getServletResponse().setContentType("application/json");
			getServletResponse().setCharacterEncoding("UTF-8");
			getServletResponse().getWriter().write(jsonResp);
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
			
			
		}
		catch(Exception e)
		{
			logger.info(e.getMessage());
		}
		
	}
	
	public void updateOptions() throws Exception
	{
		//String str = CommonUtil.getBody(getServletRequest());
		String str = "{'id':2,'answer':'A'}";
		JSONObject j = new JSONObject(str);
		Boolean resp = false;
		 Iterator<String> itr = j.keys();
                 
         String query = "Update Options set ";
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
         
         resp = optionService.updateOptions(query);
       
        getServletResponse().setContentType("application/json");
		getServletResponse().setCharacterEncoding("UTF-8");
		
		 getServletResponse().getWriter().write("{isUpdated:"+resp+"}");
		
			
		getServletResponse().getWriter().flush();
		getServletResponse().getWriter().close();
	}
	
	
	
	
}
