package com.cybage.uipiggy.action;


import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.json.JSONObject;

import com.opensymphony.xwork2.Action;

import com.cybage.uipiggy.model.Categories;
import com.cybage.uipiggy.service.CategoryService;
import com.cybage.uipiggy.service.CategoryserviceImpl;
import com.cybage.uipiggy.utils.CommonUtil;
import com.cybage.uipiggy.utils.JsonUtil;

public class CategoriesAction implements Action, ServletRequestAware,ServletResponseAware {
	
	private Log logger = LogFactory.getLog(this.getClass());
	private HttpServletRequest request;
	private HttpServletResponse response;
	
	CategoryService categoryService = new CategoryserviceImpl();
	
	
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
	
	public CategoryService getCategoryService() {
		return categoryService;
	}

	public void setCategoryService(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	
	public String execute(){
		
		logger.info("CategoriesAction.execute()");
		
		return "success";
	}
	
	public void createCategories(Long categoryId) throws Exception{
		
		
		String str = CommonUtil.getBody(getServletRequest());
		JSONObject jsonObj = new JSONObject(str);
				
		Long questionId=Long.parseLong( jsonObj.get("questionid").toString());
		String categoryName = jsonObj.get("categoryname").toString();
		String categoryType =jsonObj.get("categorytype").toString();
	
		Categories  categories = new Categories();
		categories.setCategoryname(categoryName);
		categories.setQuestionid(questionId);
		categories.setCategorytype(categoryType);
		
		
		
		try
		{
		
			logger.info("createCategories");
			Long cid = categoryService.createCategories(categories);
						
			logger.info("writing response from action");
			getServletResponse().setContentType("application/json");
			getServletResponse().setCharacterEncoding("UTF-8");
			getServletResponse().getWriter().write("{id:"+cid+"}");
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
				
		}
		
	}
	
	@SuppressWarnings("unused")
	public void getAllCategories() throws Exception 
	{
		logger.info("findAll()");
		List<Categories> categoryList = categoryService.getAllCategories();
		logger.info("Retreived all users size is.."+categoryList.size());
		
		
		try
		{
		
			logger.info("createOrUpdateUsers");
									
			String jsonresp=JsonUtil.getCateogoryListJson(categoryList);
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
	
	public void updateCategories() throws Exception
	{
		String str = CommonUtil.getBody(getServletRequest());
		JSONObject j = new JSONObject(str);
		Boolean resp = false;
		 Iterator<String> itr = j.keys();
                 
         String query = "Update Categories set ";
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
         
         resp = categoryService.updateCategories(query);
       
        getServletResponse().setContentType("application/json");
		getServletResponse().setCharacterEncoding("UTF-8");
		
		 getServletResponse().getWriter().write("{isUpdated:"+resp+"}");
		
			
		getServletResponse().getWriter().flush();
		getServletResponse().getWriter().close();
        
        
	}

}
