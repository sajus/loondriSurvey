CREATE SCHEMA IF NOT EXISTS uipiggy;
#create schema tables
USE uipiggy;

 CREATE TABLE designations (
	id          INT NOT NULL AUTO_INCREMENT,
	name       VARCHAR(30 ) NOT NULL,
	CONSTRAINT pk_designations PRIMARY KEY (id)
 );

CREATE TABLE users (
	empid                INT NOT NULL,
	firstname             VARCHAR( 20 ) NOT NULL,
	lastname             VARCHAR( 20 ) NOT NULL,
	designationid          INT NOT NULL,
	userpassword         VARCHAR( 20 ) NOT NULL,
	accesslevel         INT NOT NULL,
	email              VARCHAR( 20 ) NOT NULL,
	gender				VARCHAR( 1 ) NOT NULL,
	status				VARCHAR( 20 ) NOT NULL,
	CONSTRAINT pk_users PRIMARY KEY (empid)
 );
ALTER TABLE users ADD CONSTRAINT fk_users_designation FOREIGN KEY ( designationid ) REFERENCES designations( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
 
 CREATE TABLE survey (
	id                INT NOT NULL AUTO_INCREMENT,
	title             VARCHAR( 30 ) NOT NULL,
	description       VARCHAR(1000 ) ,
	startdate         DATETIME  NOT NULL,
	enddate           DATETIME  NOT NULL,
	CONSTRAINT pk_survey PRIMARY KEY (id)
 );
 
 
 
 CREATE TABLE questions (
	id                INT NOT NULL AUTO_INCREMENT,
	surveyid          INT NOT NULL,
	questionvalue     VARCHAR(1000 ) NOT NULL,
	questiontype      VARCHAR(30) NOT NULL,
	CONSTRAINT pk_questions PRIMARY KEY (id)
 );

ALTER TABLE questions ADD CONSTRAINT fk_questions_survey FOREIGN KEY ( surveyid ) REFERENCES survey( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
 

 CREATE TABLE options (
	id                INT NOT NULL AUTO_INCREMENT,
	categoriesid        INT NOT NULL,
	optionvalue       VARCHAR(1000 ) NOT NULL,
	answer          VARCHAR(100) NOT NULL,
	questionid		INT NOT NULL,
	CONSTRAINT pk_questions PRIMARY KEY (id)
 );

ALTER TABLE options ADD CONSTRAINT fk_options_categories FOREIGN KEY (categoriesid ) REFERENCES categories( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE options ADD CONSTRAINT fk_options_questions FOREIGN KEY (questionid ) REFERENCES questions( id ) ON DELETE NO ACTION ON UPDATE NO ACTION; 

 
 CREATE TABLE response (
	id                INT NOT NULL AUTO_INCREMENT,
	empid            INT NOT NULL,
	surveyid         INT NOT NULL,
	questionid       INT NOT NULL,
	selectedvalue    varchar(1000),
	categoryid		INT NOT NULL,
	CONSTRAINT pk_response PRIMARY KEY (id)
 );
 
 ALTER TABLE response ADD CONSTRAINT fk_response_questions FOREIGN KEY (questionid) REFERENCES questions( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
 ALTER TABLE response ADD CONSTRAINT fk_response_emp FOREIGN KEY (empid) REFERENCES users( empid ) ON DELETE NO ACTION ON UPDATE NO ACTION;
 ALTER TABLE response ADD CONSTRAINT fk_response_survey FOREIGN KEY (surveyid) REFERENCES survey(id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
 ALTER TABLE response ADD CONSTRAINT fk_response_categories FOREIGN KEY (categoryid) REFERENCES categories(id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
 
 CREATE TABLE categories (
	id                 INT NOT NULL AUTO_INCREMENT,
	questionid         INT NOT NULL,
	categoryname       VARCHAR(30) NOT NULL,
	categorytype       VARCHAR(30) NOT NULL,
	CONSTRAINT pk_categories PRIMARY KEY (id)
 );
 ALTER TABLE options ADD CONSTRAINT fk_categories_questions FOREIGN KEY (questionid ) REFERENCES questions( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;
 
