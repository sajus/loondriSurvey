package com.cybage.uipiggy.utils;


import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.cybage.uipiggy.model.Categories;
import com.cybage.uipiggy.model.Designations;
import com.cybage.uipiggy.model.Options;
import com.cybage.uipiggy.model.Questions;
import com.cybage.uipiggy.model.Response;
import com.cybage.uipiggy.model.Survey;
import com.cybage.uipiggy.model.Users;




public class JsonUtil {

	 public static String getSurveyListJson(List<Survey> surveyList) throws Exception
	{
		 JSONObject surveyResp= new JSONObject();
		  
		 JSONArray celldata = new JSONArray();
		 try
		 {
			  
			   
			   if(surveyList.size()>0)
			   {
				   
				    for(Survey s : surveyList)
				    {
					    
				    	JSONObject cell = new JSONObject();
				    	 cell.put("id", s.getId());
				    	 cell.put("title",s.getTitle());
					     cell.put("description",s.getDescription());
					     cell.put("startDate",s.getStartdate());
					     cell.put("endDate",s.getEnddate());
					     celldata.put(cell);
				    }
			   }
			 			 
		 }
		 catch(Exception e)
		 {
			 
		 }
		 
		 
		 surveyResp.put("SurveyList",celldata);
		
		 return surveyResp.toString();
		
	}
	public static String getOptionListJson(List<Options> optList) throws Exception
	 {
		 JSONObject optResp= new JSONObject();
		  
		 JSONArray celldata = new JSONArray();
		 try
		 {
			  
			   
			   if(optList.size()>0)
			   {
				   
				    for(Options o : optList)
				    {
					    
				    	JSONObject cell = new JSONObject();
				    	 cell.put("id", o.getId());
				    	 cell.put("category", o.getCategoriesid());
				    	 cell.put("answer", o.getAnswer());
				    	 cell.put("value", o.getOptionvalue());
				    	 cell.put("questionId", o.getQuestionid());
					     celldata.put(cell);
				    }
			   }
			 			 
		 }
		 catch(Exception e)
		 {
			 
		 }
		 
		 
		 optResp.put("Options",celldata);
		
		 return optResp.toString();
	 }
	 
		 
	 public static String getCateogoryListJson(List<Categories> categoryList) throws Exception
	 {
		 JSONObject categoryResp= new JSONObject();
		  
		 JSONArray celldata = new JSONArray();
		 try
		 {
			  
			   
			   if(categoryList.size()>0)
			   {
				   
				    for(Categories c : categoryList)
				    {
					    
				    	JSONObject cell = new JSONObject();
				    	 cell.put("id", c.getId());
				    	 cell.put("categoryname", c.getCategoryname());
				    	 cell.put("categorytype", c.getCategorytype());
				    	 cell.put("questionid", c.getQuestionid());
				    	 celldata.put(cell);
				    }
			   }
			 			 
		 }
		 catch(Exception e)
		 {
			 
		 }
		 
		 
		 categoryResp.put("categorieslist",celldata);
		
		 return categoryResp.toString();
	 }
	 
	 
	 public static String getUserListJson(List<Users> userList) throws Exception
	 {
		 JSONObject userResp= new JSONObject();
		  
		 JSONArray celldata = new JSONArray();
		 try
		 {
			  
			   
			   if(userList.size()>0)
			   {
				   
				    for(Users u : userList)
				    {
					    
				    	JSONObject cell = new JSONObject();
				    	 cell.put("id", u.getEmpid());
				    	 cell.put("designationid", u.getDesignationid());
				    	 cell.put("firstname", u.getFisrtname());
				    	 cell.put("lastname", u.getLastname());
				    	 cell.put("accesslevel", u.getAccesslevel());
				    	 cell.put("email", u.getEmail());
				    	 cell.put("gender", u.getGender());
				    	 cell.put("status", u.getStatus());
				    	 celldata.put(cell);
				    }
			   }
			 			 
		 }
		 catch(Exception e)
		 {
			 
		 }
		 
		 
		 userResp.put("userslist",celldata);
		
		 return userResp.toString();
	 }
	 
	public static String getDesignationJson(List<Designations> dlist) throws Exception
	{
			 JSONObject desgResp= new JSONObject();
			  
			 JSONArray celldata = new JSONArray();
			 try
			 {
				  
				   
				   if(dlist.size()>0)
				   {
					   
					    for(Designations d : dlist)
					    {
						    
					    	JSONObject cell = new JSONObject();
					    	 cell.put("id", d.getId());
					    	 cell.put("name",d.getName());
						    
						     celldata.put(cell);
					    }
				   }
				 			 
			 }
			 catch(Exception e)
			 {
				 
			 }
			 
			 
			 desgResp.put("designationslist",celldata);
			
			 return desgResp.toString();
			
	}
	public static String getQuestionJson(Questions q) throws Exception
	{
			 JSONObject jObj= new JSONObject();
			 jObj.put("id",q.getId());
			 jObj.put("type",q.getQuestiontype());
			 jObj.put("value",q.getQuestionvalue());
			 jObj.put("surveyid",q.getSurveyid());
			 
			 return jObj.toString();
	}
	
	 public static String getUserListByEmpIdJson(List<Users> userList,String designationName) throws Exception
	 {
		 	Users u= userList.get(0);	    
			 JSONObject cell = new JSONObject();
	    	 cell.put("id", u.getEmpid());
	    	 cell.put("designation", designationName);
	    	 cell.put("firstname", u.getFisrtname());
	    	 cell.put("lastname", u.getLastname());
	    	 cell.put("accesslevel", u.getAccesslevel());
	    	 cell.put("email", u.getEmail());
	    	 cell.put("gender", u.getGender());
	    	 cell.put("status", u.getStatus());
				    	
	    	 return cell.toString();
	 }
	 
	 
	 public static String getResponseListJson(List<Response>responseList,String status) throws Exception
		{
			 JSONObject respJson= new JSONObject();
			  
			 JSONArray celldata = new JSONArray();
			 try
			 {
				  
				   
				   if(responseList.size()>0)
				   {
					   
					    for(Response r : responseList)
					    {
						    
					    	JSONObject cell = new JSONObject();
					    	 cell.put("empid",r.getEmpid());
					    	 cell.put("surveyid",r.getSurveyid());
						     cell.put("questionid",r.getQuestionid());
						     cell.put("selectedvalue",r.getSelectedvalue());
						     cell.put("categoryid",r.getCategoryid());
						     cell.put("status",status);
						     celldata.put(cell);
					    }
				   }
				 			 
			 }
			 catch(Exception e)
			 {
				 
			 }
			 
			 
			 respJson.put("responselist",celldata);
			
			 return respJson.toString();
			
		}
	 
	 
	 public static String getUserListByEmail(List<Users> userListByEmail) throws Exception
	 {
		 	Users u= userListByEmail.get(0);	    
			 JSONObject cell = new JSONObject();
			 cell.put("isAuthenticated", true);		
	    	 cell.put("id", u.getEmpid());
	    	 cell.put("designationid", u.getDesignationid());
	    	 cell.put("firstname", u.getFisrtname());
	    	 cell.put("lastname", u.getLastname());
	    	 cell.put("accesslevel", u.getAccesslevel());
	    	 cell.put("gender", u.getGender());
	    	 cell.put("status", u.getStatus());
	    	    	
	    	 return cell.toString();
	 }
	 
	
	public static String getSurveyListByIdJson(List<Survey> surveyListById) throws JSONException {
		 Survey survey = surveyListById.get(0);
		 JSONObject cell = new JSONObject();
		 cell.put("id", survey.getId());
    	 cell.put("description", survey.getDescription());
    	 cell.put("title", survey.getTitle());
    	 cell.put("startdate", survey.getStartdate());
    	 cell.put("enddate", survey.getEnddate());
    	 
    	 return cell.toString();
		 
	}
	 
	 
}
