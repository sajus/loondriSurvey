package com.cybage.uipiggy.utils;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
 
public class EmailUtil {

   public static void sendEmail(String emailid , String subject , String content) { 

	   	final String username = "uipiggy@gmail.com";
		final String password = "uipiggy@123";

		Properties props = new Properties();
		props.put("mail.smtp.host", "smtp.gmail.com");
		props.put("mail.smtp.socketFactory.port", "465");
		props.put("mail.smtp.socketFactory.class",
				"javax.net.ssl.SSLSocketFactory");
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.port", "465");
 
		Session session = Session.getDefaultInstance(props,
			new javax.mail.Authenticator() {
				protected PasswordAuthentication getPasswordAuthentication() {
					return new PasswordAuthentication(username,password);
				}
			});
 
		try {
 
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress("xxx"));
			message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(emailid));
			message.setSubject(subject);
			message.setText("Hi," +
					"\n\n"+content+"\n\n Regards,"+"\n UiPiggy");
 
			Transport.send(message);
 
			
 
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	   
   }
}
