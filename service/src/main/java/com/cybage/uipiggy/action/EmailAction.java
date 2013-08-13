package com.cybage.uipiggy.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.json.JSONObject;

import com.cybage.uipiggy.utils.CommonUtil;
import com.cybage.uipiggy.utils.EmailUtil;
import com.opensymphony.xwork2.Action;



public class EmailAction implements Action, ServletRequestAware,ServletResponseAware{
	
	private Log logger = LogFactory.getLog(this.getClass());
	private HttpServletRequest request;
	private HttpServletResponse response;
	
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
	
	public String execute()
	{
		logger.info("email . execute()");
		return "success";
	}
	
	public void sendEmailNotification()
	{
		try
		{
			String str = CommonUtil.getBody(getServletRequest());
			JSONObject jsonObj = new JSONObject(str);
			String to =jsonObj.get("to").toString();
			String subject =jsonObj.get("subject").toString();
			String content = jsonObj.get("content").toString();
			EmailUtil.sendEmail(to ,subject ,content);
			
		}
		catch(Exception e)
		{
			logger.info(e.getMessage()+e.getCause());
		}
		
	}

}
