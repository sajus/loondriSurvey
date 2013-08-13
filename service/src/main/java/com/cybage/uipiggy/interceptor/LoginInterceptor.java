package com.cybage.uipiggy.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.StrutsStatics;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

@SuppressWarnings("serial")
public class LoginInterceptor extends AbstractInterceptor implements
  StrutsStatics {

 private static final Log log = LogFactory.getLog(LoginInterceptor.class);
 private static final String USER_HANDLE = "loggedInUser";


 public void init() {
  log.info("Intializing LoginInterceptor");
 }

 public void destroy() {
 }

 public String intercept(ActionInvocation invocation) throws Exception {

  final ActionContext context = invocation.getInvocationContext();
  HttpServletRequest request = (HttpServletRequest) context
    .get(HTTP_REQUEST);
  HttpSession session = request.getSession(true);

  // Is there a "user" object stored in the user's HttpSession?
  Object user = session.getAttribute(USER_HANDLE);
  if (user == null) {
   // The user has not logged in yet.
	
   // Is the user attempting to log in right now?
   

   /* The user is attempting to log in. */
	   
   return "login";
  } else {
	
   return invocation.invoke();
  }
 }

}
