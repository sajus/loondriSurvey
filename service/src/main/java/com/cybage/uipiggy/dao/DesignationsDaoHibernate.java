package com.cybage.uipiggy.dao;

import java.util.List;

import javax.persistence.NamedQuery;

import com.cybage.uipiggy.model.Designations;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Query;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.hibernate.Session;

public class DesignationsDaoHibernate extends HibernateDaoSupport implements DesignationsDao {
	
	private Log logger = LogFactory.getLog(this.getClass());

	public Long createDesignations(Designations d) throws Exception
	{
		
		logger.info("in DesignationsDaoHibernate to create/update");
		getHibernateTemplate().saveOrUpdate(d);
		Long id=d.getId();
		return id;
		
	}
	
	@SuppressWarnings("unchecked")
	public List<Designations> getDesignations() throws Exception
	{
		
		logger.info("in DesignationsDaoHibernate to create/update");
		List<Designations> dlist=getHibernateTemplate().find("From Designations");
		
		return dlist;
		
	}
	
	@SuppressWarnings("unchecked")
	public String getDesignationById(Long designationid)throws Exception{
		
		List<Designations> designationListById =  
				getHibernateTemplate().findByNamedParam("FROM Designations WHERE id = :id", "id",designationid);
		String designationName = designationListById.get(0).getName();
		
		return designationName;
	}
	
	public Boolean updateDesignation(String queryString)throws Exception{
		getHibernateTemplate().bulkUpdate(queryString);
		return true;
	}
	
}
