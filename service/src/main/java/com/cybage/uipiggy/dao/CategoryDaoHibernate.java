package com.cybage.uipiggy.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.cybage.uipiggy.model.Users;
import com.cybage.uipiggy.model.Categories;

public class CategoryDaoHibernate extends HibernateDaoSupport implements CategoryDao{
	
	private Log logger = LogFactory.getLog(this.getClass());

	public Long createCategories(Categories categories)
			throws Exception {
		logger.info("in Cateogries DAOHib");
		getHibernateTemplate().saveOrUpdate(categories); 
	
		Long cid = categories.getId();
		
		return cid;
	}
	
	public List<Categories> getAllCategories()throws Exception{
		
			List<Categories> categoryList = getHibernateTemplate().find("From Categories");
			return categoryList;
		
	}
	
	public Boolean updateCategories(String queryString)throws Exception{
		getHibernateTemplate().bulkUpdate(queryString);
		return true;
	}

		

}
