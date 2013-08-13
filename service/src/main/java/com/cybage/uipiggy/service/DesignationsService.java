package com.cybage.uipiggy.service;

import java.util.List;

import com.cybage.uipiggy.model.Designations;

public interface DesignationsService {
	
	public Long createDesignations(Designations designations) throws Exception;
	public List<Designations> getDesignations() throws Exception;
	public String getDesignationById(Long designationId)throws Exception;
	public Boolean updateDesignation(String query)throws Exception;
}
