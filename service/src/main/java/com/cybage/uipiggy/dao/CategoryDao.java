package com.cybage.uipiggy.dao;

import java.util.List;
import java.util.Map;

import com.cybage.uipiggy.model.Categories;

public interface CategoryDao {
	
	public Long createCategories(Categories categories) throws Exception;
	public List<Categories> getAllCategories()throws Exception;
	public Boolean updateCategories(String queryString)throws Exception;

}
