package com.cybage.uipiggy.service;

import java.util.List;
import java.util.Map;


import com.cybage.uipiggy.dao.CategoryDao;
import com.cybage.uipiggy.dao.CategoryDaoHibernate;
import com.cybage.uipiggy.model.Users;
import com.cybage.uipiggy.model.Categories;

public class CategoryserviceImpl implements CategoryService {
	
	CategoryDao categoryDao = new CategoryDaoHibernate();
	
	public CategoryDao getCategoryDao() {
		return categoryDao;
	}

	public void setCategoryDao(CategoryDao categoryDao) {
		this.categoryDao = categoryDao;
	}
	
	public Long createCategories(Categories categories) throws Exception{
		
		Long id = categoryDao.createCategories(categories);
		return id;
	}
	
	public List<Categories> getAllCategories()throws Exception{
		List<Categories> categoryList = categoryDao.getAllCategories();
		return categoryList;
	}
	
	public Boolean updateCategories(String queryString)throws Exception{
		categoryDao.updateCategories(queryString);
		return true;
	}

	

}
