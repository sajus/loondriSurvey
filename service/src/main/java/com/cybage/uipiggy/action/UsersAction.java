package com.cybage.uipiggy.action;


import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.json.JSONObject;

import com.cybage.uipiggy.model.Users;
import com.cybage.uipiggy.service.DesignationsService;
import com.cybage.uipiggy.service.DesignationsServiceImpl;
import com.cybage.uipiggy.service.UsersService;
import com.cybage.uipiggy.service.UsersServiceImpl;
import com.cybage.uipiggy.utils.CommonUtil;
import com.cybage.uipiggy.utils.JsonUtil;

import com.opensymphony.xwork2.Action;

public class UsersAction implements Action, ServletRequestAware,ServletResponseAware{
	
	private Log logger = LogFactory.getLog(this.getClass());
	private HttpServletRequest request;
	private HttpServletResponse response;
	UsersService usersService = new UsersServiceImpl();
	DesignationsService designationsService = new DesignationsServiceImpl();
	

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
	
	
	public UsersService getUsersService() {
		return usersService;
	}

	public void setUsersService(UsersService usersService) {
		this.usersService = usersService;
	}
	
	public DesignationsService getDesignationsService() {
		return designationsService;
	}

	public void setDesignationsService(DesignationsService designationsService) {
		this.designationsService = designationsService;
	}
	
	public String execute(){
		
		logger.info("UsersAction.execute()");
		
		return "success";
	}
	
	
	public void createUsers() throws Exception{
		String str = CommonUtil.getBody(getServletRequest());
		JSONObject jsonObj = new JSONObject(str);
		logger.info("------------------------JSON OBJECT--------"+jsonObj);
		
		String firstName = jsonObj.get("firstname").toString();
		String lastName = jsonObj.get("lastname").toString();
		String email = jsonObj.get("email").toString()+"@cybage.com";
		String password = jsonObj.get("password").toString();
		String gender = jsonObj.get("gender").toString();
		String status = jsonObj.get("status").toString();
		Long empId=Long.parseLong( jsonObj.get("empId").toString());
		Long designationId=Long.parseLong( jsonObj.get("designationid").toString());
		String acessLevel = jsonObj.get("accesslevel").toString();
		
		Map<String,String>hm = new 	HashMap<String, String>();
	
		Users users = new Users();
		users.setEmpid(empId);
		users.setDesignationid(designationId);
		users.setFisrtname(firstName);
		users.setLastname(lastName);
		users.setStatus(status);
		//String pass = CommonUtil.crypt(password);
		users.setUserpassword(password);
		
		users.setEmail(email);
		users.setAccesslevel(acessLevel);
		
		
		users.setGender(gender);
				
		try
		{
		
			logger.info("createUsers");
			hm = usersService.createUsers(users);
			String id = hm.get("empId");
			getServletResponse().setContentType("application/json");
			getServletResponse().setCharacterEncoding("UTF-8");
			getServletResponse().getWriter().write("{empId:"+id+"}");
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
				
		}
		
	}
	@SuppressWarnings("unchecked")
	public void findAll() throws Exception 
	{
		logger.info("findAll()");
		List<Users> userList = usersService.getAllUsers();
		logger.info("Retreived all users size is.."+userList.size());
		
		try
		{
		
			logger.info("createOrUpdateUsers");
									
			String jsonresp=JsonUtil.getUserListJson(userList);
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
	
	
	public void getUsersByEmpId()
	{
		try
		{
			String str = CommonUtil.getBody(getServletRequest());
			JSONObject jsonObj = new JSONObject(str);
			Long empId=Long.parseLong( jsonObj.get("empId").toString());
		
		
			logger.info("getUsersByEmpId()");
			List<Users> userListById = usersService.getUsersByEmpId(empId);
			
			Long designationId = userListById.get(0).getDesignationid();
			String designationName = designationsService.getDesignationById(designationId);
			String jsonresp=JsonUtil.getUserListByEmpIdJson(userListById,designationName);
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
	
	public void updateUsers() throws Exception
	{
		String str = CommonUtil.getBody(getServletRequest());
		JSONObject j = new JSONObject(str);
		Boolean resp = false;
		 Iterator<String> itr = j.keys();
                 
         String query = "Update Users set ";
         String whereClause = " where";
         int counter =0; 
         while(itr.hasNext())
         {
               String key = itr.next();
               System.out.println(key);
               if(key.equalsIgnoreCase("empid"))
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
         
         resp = usersService.updateUsers(query);
       
        getServletResponse().setContentType("application/json");
		getServletResponse().setCharacterEncoding("UTF-8");
		
		 getServletResponse().getWriter().write("{isUpdated:"+resp+"}");
		
			
		getServletResponse().getWriter().flush();
		getServletResponse().getWriter().close();
        
        
	}
	

	

}
