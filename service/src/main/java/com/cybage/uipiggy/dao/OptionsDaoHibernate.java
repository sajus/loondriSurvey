package com.cybage.uipiggy.dao;

import java.util.List;

import com.cybage.uipiggy.model.Options;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.Transactional;

public class OptionsDaoHibernate extends HibernateDaoSupport implements OptionsDao {

	private Log logger = LogFactory.getLog(this.getClass());
	
	public Long createOptions(Options o) throws Exception
	{
		logger.info("in OptionsDaoHibernate to create/update");
		getHibernateTemplate().saveOrUpdate(o);
		Long id=o.getId();
		return id;
		
	}
	
	public List<Options> getOptionsByCategoryId(Long cid)  throws Exception
	{
		List<Options> optList = getHibernateTemplate().findByNamedParam(
				"FROM Options WHERE categoriesid = :categoriesid", "categoriesid",
				cid);

		return optList;
	}
	
	public List<Options> getOptionsByQuestionsId(Long qid)  throws Exception
	{
		List<Options> optList = getHibernateTemplate().findByNamedParam(
				"FROM Options WHERE questionid = :questionid", "questionid",
				qid);

		return optList;
	}
	
	public Boolean updateOptions(String queryString)throws Exception{
		getHibernateTemplate().bulkUpdate(queryString);
		return true;
	}
	
}
