package com.cybage.uipiggy.action;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.json.JSONObject;

import com.cybage.uipiggy.model.Users;
import com.cybage.uipiggy.service.LoginService;
import com.cybage.uipiggy.service.UsersService;
import com.cybage.uipiggy.service.LoginServiceImpl;
import com.cybage.uipiggy.service.UsersServiceImpl;
import com.cybage.uipiggy.utils.CommonUtil;
import com.cybage.uipiggy.utils.JsonUtil;
import com.opensymphony.xwork2.Action;

public class LoginAction implements Action, ServletRequestAware,ServletResponseAware {
	
	private Log logger = LogFactory.getLog(this.getClass());
	private HttpServletRequest request;
	private HttpServletResponse response;
	LoginService loginService = new LoginServiceImpl();
	UsersService usersService = new UsersServiceImpl();		
	


	public UsersService getUsersService() {
		return usersService;
	}

	public void setUsersService(UsersService usersService) {
		this.usersService = usersService;
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
	
	public LoginService getLoginService() {
		return loginService;
	}

	public void setLoginService(LoginService loginService) {
		this.loginService = loginService;
	}
	
	public String execute(){
		
		logger.info("LoginAction.execute()");
		
		return "success";
	}
	
	
	
	
	public void doLogin() throws Exception
	{
		logger.info("LoginAction.doLogin()");
		
		String str = CommonUtil.getBody(getServletRequest());
		JSONObject jsonObj = new JSONObject(str);
		logger.info(jsonObj.get("email")+"   --------- "+jsonObj.get("password"));
		
		try
		{
			String username = jsonObj.get("email").toString()+"@cybage.com";//(String) getServletRequest().getParameter("email")+"@cybage.com";
			String password = jsonObj.get("password").toString();//(String) getServletRequest().getParameter("password");
			String pass = CommonUtil.crypt(password);
			Users users = loginService.CheckLoginUser(username, password);
			getServletResponse().setCharacterEncoding("UTF-8");
			if(users!=null){
				 HttpSession session = request.getSession(true);       
		         session.setAttribute("loggedInUser",username); 
		         List<Users> userListByEmail = usersService.getUsersByEmail(username);
		         String jsonresp=JsonUtil.getUserListByEmail(userListByEmail);
					logger.info("writing response from action");
					getServletResponse().setContentType("application/json");
					getServletResponse().setCharacterEncoding("UTF-8");
					getServletResponse().getWriter().write(jsonresp);
					getServletResponse().getWriter().flush();
					getServletResponse().getWriter().close();
			}
		
			else
			{
				logger.debug("login failed....");
				 System.out.print("Login failed...");
				getServletResponse().getWriter().write("{isAuthenticated:false}");
			}
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
		}catch(Exception e)
		{
			logger.error("error", e);
		}
		
	}
	
	public void doLogout() throws Exception
	{
		logger.info("LoginAction.doLogout()");
		try
		{
			request.getSession().invalidate();
			getServletResponse().setCharacterEncoding("UTF-8");
			getServletResponse().getWriter().write("logout");
			getServletResponse().getWriter().flush();
			getServletResponse().getWriter().close();
		}catch(Exception e)
		{
			logger.error("error", e);
		}
		
	}



}
