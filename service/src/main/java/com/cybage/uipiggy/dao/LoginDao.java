package com.cybage.uipiggy.dao;

import com.cybage.uipiggy.model.Users;

public interface LoginDao {
	
	public Users CheckLoginUser(String username,String password) throws Exception;

}
