package com.cybage.uipiggy.dao;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.cybage.uipiggy.model.Users;

public class LoginDaoHibernate extends HibernateDaoSupport implements LoginDao {
	
private Log logger = LogFactory.getLog(this.getClass());
	
	public Users CheckLoginUser(String email,String password) throws Exception
	{
		logger.info("In LoginDaoHib");
		Object[] params  = {email, password};
		List<Users> loginList = getHibernateTemplate().find("FROM Users where email=? AND userpassword=?",params);
		Users users = null;
		if(loginList.size()>0)
			users = loginList.get(0);
		
		return users;
				
	}

}
