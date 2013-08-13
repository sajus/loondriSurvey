package com.cybage.uipiggy.service;

import java.util.List;
import java.util.Map;

import com.cybage.uipiggy.model.Survey;
import com.cybage.uipiggy.model.Users;

public interface UsersService {
	
	public Map<String,String> createUsers(Users users) throws Exception;
	public List<Users> getAllUsers()throws Exception;
	public List<Users> getUsersByEmpId(Long empId)throws Exception;
	public List<Users> getUsersByEmail(String email)throws Exception;
	public Boolean updateUsers(String queryString)throws Exception;
	

}
