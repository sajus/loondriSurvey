package com.cybage.uipiggy.service;

import java.util.List;

import com.cybage.uipiggy.dao.DesignationsDao;
import com.cybage.uipiggy.dao.DesignationsDaoHibernate;
import com.cybage.uipiggy.model.Designations;

public class DesignationsServiceImpl implements DesignationsService {
	
	DesignationsDao designationsDao=new DesignationsDaoHibernate();
	
	public DesignationsDao getDesignationsDao() {
		return designationsDao;
	}

	public void setDesignationsDao(DesignationsDao designationsDao) {
		this.designationsDao = designationsDao;
	}

	
	
	public Long createDesignations(Designations designations) throws Exception
	{
		Long desId=designationsDao.createDesignations(designations);
		return desId;
	}
	
	public List<Designations> getDesignations() throws Exception
	{
		List<Designations> dlist = designationsDao.getDesignations();
		return dlist;
	}
	
	public String getDesignationById(Long designationId)throws Exception{
		
		String designationName = designationsDao.getDesignationById(designationId);
		return designationName;
	}
	
	public Boolean updateDesignation(String queryString)throws Exception{
		 designationsDao.updateDesignation(queryString);
		 return true;
	}

}
