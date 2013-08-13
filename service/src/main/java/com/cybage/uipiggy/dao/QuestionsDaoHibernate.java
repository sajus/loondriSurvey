package com.cybage.uipiggy.dao;

import java.util.List;

import com.cybage.uipiggy.model.Questions;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.dao.support.DataAccessUtils;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.Transactional;

public class QuestionsDaoHibernate extends HibernateDaoSupport implements QuestionsDao {
	
	private Log logger = LogFactory.getLog(this.getClass());
	
	public Long createQuestions(Questions q) throws Exception
	{
		logger.info("in QuestionsDaoHibernate to create");
		getHibernateTemplate().saveOrUpdate(q);
		Long id=q.getId();
		
		return id;
	}
	
	public Questions getQuestionById(Long qid) throws Exception
	{
		List<Questions> questionsList  = getHibernateTemplate()
				.findByNamedParam("FROM Questions WHERE id = :ID", "ID", qid);
		Questions q = null;
		
		if(questionsList.size() > 0 )
		 q = questionsList.get(0);
		
		return q;
	}
	
	public Boolean updateQuestions(String queryString) throws Exception{
		getHibernateTemplate().bulkUpdate(queryString);
		return true;
	}
	

}
