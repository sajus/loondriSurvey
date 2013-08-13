package com.cybage.uipiggy.service;


import java.util.List;

import com.cybage.uipiggy.dao.OptionsDao;
import com.cybage.uipiggy.dao.OptionsDaoHibernate;
import com.cybage.uipiggy.model.Options;

public class OptionServiceImpl implements OptionService {
	
	OptionsDao optionsDao=new OptionsDaoHibernate();
	
	public OptionsDao getOptionsDao() {
		return optionsDao;
	}

	public void setOptionsDao(OptionsDao optionsDao) {
		this.optionsDao = optionsDao;
	}
	
	public Long createOptions(Options options) throws Exception
	{
		Long id = optionsDao.createOptions(options);
		
		return id;
	}

	public List<Options> getOptionsByCategoryId(Long cid)  throws Exception
	{
		List<Options> optList=optionsDao.getOptionsByCategoryId(cid);
		return optList;
	}
	
	public List<Options> getOptionsByQuestionsId(Long qid)  throws Exception
	{
		List<Options> optList=optionsDao.getOptionsByQuestionsId(qid);
		return optList;
	}
	
	public Boolean updateOptions(String queryString)throws Exception{
		optionsDao.updateOptions(queryString);
		return true;
	}
	

}
