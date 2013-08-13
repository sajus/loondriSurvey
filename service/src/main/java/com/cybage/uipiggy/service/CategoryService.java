package com.cybage.uipiggy.service;

import java.util.List;
import java.util.Map;


import com.cybage.uipiggy.model.Categories;
import com.cybage.uipiggy.model.Users;

public interface CategoryService {
	
	public Long createCategories(Categories categories) throws Exception;
	public List<Categories> getAllCategories()throws Exception;
	public Boolean updateCategories(String queryString)throws Exception;

}
