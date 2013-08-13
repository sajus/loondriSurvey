package com.cybage.uipiggy.dao;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import com.cybage.uipiggy.model.Participants;

public class ParticipantsDaoHibernate extends HibernateDaoSupport implements ParticipantsDao
{
	private Log logger = LogFactory.getLog(this.getClass());
	
	public void saveParticipantsStatus(Participants p) throws Exception
	{
		getHibernateTemplate().saveOrUpdate(p); 
		
	}
}
