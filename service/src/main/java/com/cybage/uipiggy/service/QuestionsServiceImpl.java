package com.cybage.uipiggy.service;

import com.cybage.uipiggy.model.Questions;
import com.cybage.uipiggy.dao.QuestionsDao;
import com.cybage.uipiggy.dao.QuestionsDaoHibernate;;

public class QuestionsServiceImpl implements QuestionsService {
	
	QuestionsDao questionsDao=new QuestionsDaoHibernate();
	
	public QuestionsDao getQuestionsDao() {
		return questionsDao;
	}

	public void setQuestionsDao(QuestionsDao questionsDao) {
		this.questionsDao = questionsDao;
	}

	public Long createQuestions(Questions questions) throws Exception
	{
		Long id=questionsDao.createQuestions(questions);
		return id;
		
	}
	
	public Questions getQuestionById(Long qid) throws Exception
	{
		Questions q=questionsDao.getQuestionById(qid);
		return q;
	}
	
	public Boolean updateQuestions(String queryString) throws Exception{
		questionsDao.updateQuestions(queryString);
		return true;
	}

}
