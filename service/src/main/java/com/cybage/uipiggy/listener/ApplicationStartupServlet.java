package com.cybage.uipiggy.listener;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.Properties;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class ApplicationStartupServlet extends HttpServlet {
	
	private static final long serialVersionUID = 1L;
	private Log logger = LogFactory.getLog(this.getClass());
	
	private void loadProperties(String filename)
	{
		try
		{
			Properties applicationProps = new Properties();
			File file = new File(filename);
			InputStream inputStream= new FileInputStream(file);
			applicationProps.load(inputStream);
			Enumeration<Object> em = applicationProps.keys();
			while(em.hasMoreElements()){
				String key = (String)em.nextElement();
				System.setProperty(key, (String)applicationProps.get(key));
			}
		}catch(Exception e)
		{
			e.printStackTrace();
		}
	}
	
	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {

		try {

			super.init(config);


			//String applicationProperties = config.getServletContext().getRealPath("/") + "/WEB-INF/classes/" +config.getInitParameter("applicationProperties");
			String buildVersionProperties = config.getServletContext().getRealPath("/") + "/WEB-INF/classes/build.properties";
			System.setProperty("contextPath",config.getServletContext().getRealPath("/"));

			//logger.debug("Initialization Watchman appication properties ...Configuration File " + applicationProperties);

			//loadProperties(applicationProperties);
			loadProperties(buildVersionProperties);

		} catch (Exception exc) {
			logger.error("error",exc);
		}

	}

	public void destroy() {
		super.destroy();
	}
}
