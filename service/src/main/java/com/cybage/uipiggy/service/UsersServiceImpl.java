package com.cybage.uipiggy.service;

import java.util.List;
import java.util.Map;

import com.cybage.uipiggy.dao.UsersDao;
import com.cybage.uipiggy.dao.UsersDaoHibernate;
import com.cybage.uipiggy.model.Users;

public class UsersServiceImpl implements UsersService{
	
	UsersDao usersDao = new UsersDaoHibernate();
	
	public UsersDao getUsersDao() {
		return usersDao;
	}

	public void setUsersDao(UsersDao usersDao) {
		this.usersDao = usersDao;
	}

	public Map<String,String> createUsers(Users users) throws Exception{
		Map<String,String>hm;
		hm = usersDao.createUsers(users);
		return hm;
	}
	
	public List<Users> getAllUsers()throws Exception{
		List<Users> userList = usersDao.getAllUsers();
		return userList;
		
	}
	
	public List<Users> getUsersByEmpId(Long empId)throws Exception{
		
		List<Users> userListById = usersDao.getUsersByEmpId(empId);
		return userListById;
	}
	
	public List<Users> getUsersByEmail(String email)throws Exception{
		List<Users>userListByEmail = usersDao.getUsersByEmail(email);
		return userListByEmail;
	}
	
	public Boolean updateUsers(String queryString)throws Exception{
		usersDao.updateUsers(queryString);
		return true;
	}
	
	
}
