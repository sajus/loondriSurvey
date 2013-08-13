package com.cybage.uipiggy.service;

import com.cybage.uipiggy.dao.LoginDao;
import com.cybage.uipiggy.dao.LoginDaoHibernate;
import com.cybage.uipiggy.model.Users;


public class LoginServiceImpl implements LoginService {


	LoginDao loginDao = new LoginDaoHibernate();
	
	public LoginDao getLoginDao() {
		return loginDao;
	}
	public void setLoginDao(LoginDao loginDao) {
		this.loginDao = loginDao;
	}
	
	public Users CheckLoginUser(String username,String password) throws Exception{
		Users loginUser;
		loginUser = loginDao.CheckLoginUser(username, password);
		return loginUser;
		
	}

}
