package com.cybage.uipiggy.service;

import com.cybage.uipiggy.model.Survey;
import com.cybage.uipiggy.model.Users;

public interface LoginService {
	
	public Users CheckLoginUser(String username,String password) throws Exception;

}
