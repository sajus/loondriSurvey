package com.cybage.uipiggy.service;

import java.util.List;

import com.cybage.uipiggy.model.Options;


public interface OptionService {
	
	public Long createOptions(Options options) throws Exception;
	public List<Options> getOptionsByCategoryId(Long cid)  throws Exception;
	public List<Options> getOptionsByQuestionsId(Long qid)  throws Exception;
	public Boolean updateOptions(String queryString)throws Exception;
	
}
