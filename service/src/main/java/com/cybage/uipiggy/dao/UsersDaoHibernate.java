package com.cybage.uipiggy.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.cybage.uipiggy.model.Users;

public class UsersDaoHibernate extends HibernateDaoSupport implements UsersDao {
	private Log logger = LogFactory.getLog(this.getClass());
	
	public Map<String,String> createUsers(Users users) throws Exception{
		
		logger.info("in Users DAOHib");
		getHibernateTemplate().saveOrUpdate(users); 
		Long uid = users.getEmpid();
		String accessLevel = users.getAccesslevel();
		Map<String,String> hm = new HashMap<String, String>();
		hm.put("userid", uid.toString());
		hm.put("accesslevel", accessLevel);
		return hm;
	}
	@SuppressWarnings("unchecked")
	public List<Users> getAllUsers()throws Exception{
		List<Users> userList = getHibernateTemplate().find("From Users");
		return userList;
	}
	
	public List<Users> getUsersByEmpId(Long empId)throws Exception{
		
		List<Users> userListById =  getHibernateTemplate().findByNamedParam(
				"FROM Users WHERE empid = :empId", "empId",
				empId);
		return userListById;
	}
	
	public List<Users> getUsersByEmail(String email)throws Exception{
		
		List<Users> userListByEmail =  getHibernateTemplate().findByNamedParam(
				"FROM Users WHERE email = :email", "email",
				email);
		return userListByEmail;
	}
	
	public Boolean updateUsers(String queryString)throws Exception{
		getHibernateTemplate().bulkUpdate(queryString);
		return true;
	}
	
	

}
