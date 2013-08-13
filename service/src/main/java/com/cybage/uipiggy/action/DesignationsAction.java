package com.cybage.uipiggy.action;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.json.JSONException;
import org.json.JSONObject;

import com.cybage.uipiggy.model.Designations;
import com.cybage.uipiggy.service.DesignationsService;
import com.cybage.uipiggy.service.DesignationsServiceImpl;
import com.cybage.uipiggy.utils.CommonUtil;
import com.cybage.uipiggy.utils.JsonUtil;


import com.opensymphony.xwork2.Action;

public class DesignationsAction implements Action, ServletRequestAware,ServletResponseAware{
	
	DesignationsService designationsService = new DesignationsServiceImpl();
	private Log logger = LogFactory.getLog(this.getClass());
	private HttpServletRequest request;
	private HttpServletResponse response;
	Designations designations;
	
	
	public DesignationsService getDesignationsService() {
		return designationsService;
	}
	public void setDesignationsService(DesignationsService designationsService) {
		this.designationsService = designationsService;
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
	
		
	public void createDesignations(Long id)
	{
		try
		{	
			String str = CommonUtil.getBody(getServletRequest());
			JSONObject jsonObj = new JSONObject(str);
			String dname=jsonObj.getString("name");
			
			designations=new Designations();
			designations.setName(dname);
		
			Long did=designationsService.createDesignations(designations);
			
			logger.info("designation action"+did);
			
			getServletResponse().setContentType("application/json");
			getServletResponse().setCharacterEncoding("UTF-8");
			getServletResponse().getWriter().write("{id:"+did+"}");
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
			
			
		}
		catch(Exception e)
		{
			logger.error("Exception in action",e);
				
		}
	}
	
	public void getAllDesignations()
	{
		try
		{
			
			List<Designations> dlist=designationsService.getDesignations();
			String desgJson=JsonUtil.getDesignationJson(dlist);
			getServletResponse().setContentType("application/json");
			getServletResponse().setCharacterEncoding("UTF-8");
			getServletResponse().getWriter().write(desgJson);
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
			
			
			
		}
		catch(Exception e)
		{
			logger.info(e.getMessage());
		}
	}
	
	public void updateDesignation() throws Exception
	{
		String str = CommonUtil.getBody(getServletRequest());
		JSONObject j = new JSONObject(str);
		Boolean resp = false;
		 Iterator<String> itr = j.keys();
                 
         String query = "Update Designations set ";
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
         
        resp = designationsService.updateDesignation(query);
       
        getServletResponse().setContentType("application/json");
		getServletResponse().setCharacterEncoding("UTF-8");
		getServletResponse().getWriter().write("{isUpdated:"+resp+"}");
		 
		getServletResponse().getWriter().flush();
		getServletResponse().getWriter().close();
        
        
	}
	

}
