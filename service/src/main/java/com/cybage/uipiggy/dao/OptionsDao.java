package com.cybage.uipiggy.dao;

import java.util.List;

import com.cybage.uipiggy.model.Options;


public interface OptionsDao {

	public Long createOptions(Options o) throws Exception;
	public List<Options> getOptionsByCategoryId(Long cid)  throws Exception;
	public List<Options> getOptionsByQuestionsId(Long qid)  throws Exception;
	public Boolean updateOptions(String queryString)throws Exception;
	
}
