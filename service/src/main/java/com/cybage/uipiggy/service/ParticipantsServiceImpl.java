package com.cybage.uipiggy.service;

import com.cybage.uipiggy.model.Participants;
import com.cybage.uipiggy.dao.ParticipantsDao;
import com.cybage.uipiggy.dao.ParticipantsDaoHibernate;

public class ParticipantsServiceImpl implements ParticipantsService {
	
	ParticipantsDao participantsDao = new ParticipantsDaoHibernate();
	
	public ParticipantsDao getParticipantsDao() {
		return participantsDao;
	}

	public void setParticipantsDao(ParticipantsDao participantsDao) {
		this.participantsDao = participantsDao;
	}

	public void saveParticipantsStatus(Participants p) throws Exception
	{
		try
		{
			participantsDao.saveParticipantsStatus(p);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
	}

}
