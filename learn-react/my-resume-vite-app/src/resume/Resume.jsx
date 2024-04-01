import React from 'react'
import './resume.css';
// import './ProfessionalExperience.css';

const About = () => {
  return (
    <>
      <div className="resume-about">
        <h2>About Me</h2>
        <p>
          Experienced Software Developer with 14.3 years of expertise in designing, developing, and deploying innovative software solutions.
          Proficient in various programming languages and technologies, with a strong focus on Java for backend development and React.js for frontend development.
          Demonstrated success in leading development teams, managing projects from conception to completion, and delivering high-quality products within tight deadlines.
          Proven ability to analyze complex problems, devise effective solutions, and communicate technical concepts to non-technical stakeholders. Seeking to leverage extensive experience and technical proficiency to drive software excellence at a forward-thinking organization committed to pushing technological boundaries. </p>
      </div>
    </>
  )
}

const Education = () => {
  return (
    <div className="resume-education">
      <h2 className="resume-education-title">Education</h2>
      <div className="timeline">
        <div className="line"></div>
        <div className="resume-education-item">
          <div className="circle"></div>
          <div>
            <h4>Bachelor of Engineering, Computer Science and Engineering</h4>
            <h5>2005 - 2009</h5>
            <p><em>B. C. E. Bhagalpur, Bihar</em></p>
          </div>
        </div>
        <div className="resume-education-item">
          <div className="circle"></div>
          <div>
            <h4>Intermediate of Science, Mathematics</h4>
            <h5>2002 - 2004</h5>
            <p><em>M. S. College, Motihari, Bihar</em></p>
          </div>
        </div>
        <div className="resume-education-item">
          <div className="circle"></div>
          <div>
            <h4>Matriculation</h4>
            <h5>2001 - 2002</h5>
            <p><em>Gopal Sah Vidyalaya, Motihari, Bihar</em></p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfessionalExperience = () => {
  return (
    <div className="resume-professional-experience">
      <h2 className="resume-professional-experience-title">Professional Experience</h2>
      <div className="timeline">
        <div className="line"></div>
        {experienceData.map((experience, index) => (
          <div className="resume-item" key={index}>
            <div className="circle"></div>
            <div>
              <h4>{experience.title}</h4>
              <h5>{experience.tenure}</h5>
              <p><em>{experience.company}</em></p>
              <ul>
                {experience.responsibilities.map((responsibility, idx) => (
                  <li key={idx}>{responsibility}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Resume = () => {
  return (
    <div>
      <About />
      <Education />
      <ProfessionalExperience />
    </div>
  )
}

const experienceData = [
  {
    title: "Senior Staff Engineer",
    tenure: "June 2023 to Feb 2024",
    company: "Zycus Infotech Pvt. Ltd., Bangalore, India",
    responsibilities: [
      "Development in “ESG Lythouse” application. Technologies used are Java/J2EE, Spring Boot, Spring GraphQL, MongoDB, ReactJS.",
      "Added code for new features (Category, EU Taxonomy, Goals, Initiatives, Metrics)",
      "Worked in Agile methodology to gather requirements from clients and created Epics and stories for implementation",
      "Worked with team to guide for assigned task.",
      "Worked with the implementation team to live Lythouse application in QA and pre-prod environment for given clients.",
      "Fixed bugs identified by QA team and shared through Jira"
    ]
  },
  {
    title: "Lead Backend Developer",
    tenure: "Dec 2022 to Feb 2023",
    company: "EVC Ventures, Gurgaon, India",
    responsibilities: [
      "Worked to add JavaMelody and ShedLock to monitor and improve performance of application",
      "Development in “IITD-Admin” and 'SPortal' application. Technologies used are Java/J2EE, Spring Boot, Spring REST, MyBatis, Spring MVC, Bootstrap, ReactJS.",
      "Added code for new requirements (Store and Purchase module)",
      "Worked in Agile methodology to gather requirements from clients and created Epics and stories for implementation",
      "Worked with team to guide for assigned task.",
      "Fixed bugs identified by support team and shared through Jira",
      "Worked with vendor and project management team on a code change and new fix in upcoming Release."
    ]
  },
  {
    title: "Project Leader",
    tenure: "Oct 2021 to Dec 2022",
    company: "RSystems International Pvt Ltd, Noida, India",
    responsibilities: [
      "Development in “Ephesoft Transact” application. Technologies used are Java/J2EE, Spring Boot, Spring REST, Hibernate, Oracle 12g, GWT, Bootstrap, Angular.",
      "Added code for new requirements (SRE service integration)",
      "Served Scrum master responsibility to manage sprints",
      "Worked in Agile methodology to gather requirements from clients and created Epics and stories for implementation",
      "Worked with team to guide for assigned task.",
      "Fixed bugs identified by support team and shared through Jira",
      "Worked with vendor and project management team on a code change and new fix in upcoming Release."
    ]
  },
  {
    title: "Senior Software Developer",
    tenure: "Jan 2021 to Feb 2021",
    company: "Mynd Integrated Solutions Ltd, Gurgaon, India",
    responsibilities: [
      "Development in “m1xchange” application. Technologies used are Java/J2EE, SQL Server, Spring Boot, Bootstrap.",
      "Worked in Agile methodology to gather requirements from clients and created Epics and stories for implementation",
      "Worked with team to guide for assigned task.",
      "Fixed bugs identified by support team and shared through Jira",
      "Worked with vendor and project management team on a code change and new fix in upcoming Release."
    ]
  },
  {
    title: "Team Lead",
    tenure: "Sep 2019 to Oct 2021",
    company: "Dhani stocks Limited, (formerly Indiabulls security Ltd , Indiabulls ventures ltd), Gurgaon, India",
    responsibilities: [
      "Development in “ShubhWeb” application. Technologies used are Java/J2EE, Spring Boot, Spring Batch, Spring REST, Hibernate, Oracle 12g, ReactJS, Bootstrap.",
      "Worked for development of helper applications Notis API, KRA, SFTP projects",
      "Worked as Team Lead and successfully delivered new functionality for implementation of NSDL/CDSL Edis 3rd party Restful web services in shubhweb application.",
      "Migrated code from SVN to GITLab Server",
      "Migrated old react class components to new functional components",
      "Served Scrum master responsibility to manage sprints",
      "Worked in Agile methodology to gather requirements from clients and created Epics and stories for implementation",
      "Worked with team to guide for assigned task.",
      "Fixed bugs identified by support team and shared through Jira",
      "Worked with vendor and project management team on a code change and new fix in upcoming Release."
    ]
  },
  {
    title: "Senior Software Engineer",
    tenure: "Mar 2017 to July 2017",
    company: "Accenture, Mumbai, India",
    responsibilities: [
      "Development in ZVR4 Data Migration project with Talend tool and java API (Spring Batch, multithreading)",
      "Worked to write java code to parallel process the blob data of table of legacy database and save to target database.",
      "Coordinated with client team at Germany location to gather requirements",
      "Worked in Agile methodology to gather requirements from clients and created Epics and stories for implementation",
      "Worked with team to guide for assigned task.",
      "Fixed bugs identified by support team and shared through Jira",
      "Worked with vendor and project management team on a code change and new fix in upcoming Release.",
      "Note: Due to health issues, I returned back to home post this small tenure in Bangalore and Mumbai."
    ]
  },
  {
    title: "Assistant Manager, IT Applications",
    tenure: "Jan 2014 to Sep 2019",
    company: "Concentrix Daksh Services India Private Limited, Gurgaon, India",
    responsibilities: [
      "Worked in 2014 as L2/L3 support Engineer contractual employee from WDC, deployed in Concentrix India. During this period I worked with software development team of WebDOTS 4.1, QAA using Java, J2EE, Hibernate, JSF, and Struts2. These application runs on IBM WebSphere 8.",
      "During 2015-17 I worked for development of Zetta application using Java, J2ee, AngularJS, REST, and Hibernate. Also I worked as DevOps engineer to configure Zetta application environments on AWS cloud using Jenkins, JIRA, AWS, BitBucket, Chef scripts.",
      "Post 6 months gap, I rejoined Concentrix and worked for duration 2017-2019 for development of “Global Incentive Program(GIP)” application. Technologies used are Java/J2EE, Spring Boot, Hibernate, MySQL, AngularJS, Bootstrap.",
      "Provided L2/L3 level support to WebDOTS 4.1, QAA application.",
      "Updated and created incident management tickets in the ticket tracking application",
      "Identified defects within WebDOTS 4.1, QAA application",
      "Provided support for the successful deployment of multiple iterations of the WebDOTS 4.1, QAA application.",
      "Provided L2/L3 level support to Zetta application.",
      "Create, monitor and update defects in Jira",
      "Installed applications in AWS environment using Jenkins, and AWS CloudFormation",
      "Provided support for the successful deployment of multiple iterations of the Zetta application",
      "Provided L2/L3 level support to GainManager and ResolveJiffy application.",
      "Wrote and executed SQL queries for reporting and research purposes.",
      "Provided support for the successful deployment of multiple iterations of the GM and RJ application",
      "Worked with vendor and project management team on a code change and new fix in upcoming Release.",
      "Worked in Agile methodology to gather requirements from clients and created Epics and stories for implementation",
      "Worked with team to guide for assigned task.",
      "Fixed bugs identified by support team and shared through Jira",
      "Worked with vendor and project management team on a code change and new fix in upcoming Release."
    ]
  },
  {
    title: "Application Developer",
    tenure: "May 2012 to Dec 2013",
    company: "Novelvox Software India Pvt Ltd (previously known as Integration Services & Technologies India PVT LTD), Faridabad, India",
    responsibilities: [
      "Development for iAgent web application to develop service generation module and service invocation module using Java, J2ee, JDBC, Apache Solr, Hibernate Flex4, CSS, JavaScript to develop views and backend services",
      "Developed REST services to upload Pdf documents and used Apache Solr to create indexes for all uploaded pdf documents, so that search for given text could be faster",
      "Worked in Agile methodology to gather requirements from clients and created Epics and stories for implementation",
      "Worked with team to guide for assigned task.",
      "Fixed bugs identified by support team and shared through Jira",
      "Worked with vendor and project management team on a code change and new fix in upcoming Release."
    ]
  },
  {
    title: "Software Developer",
    tenure: "March 2011 to May 2012",
    company: "HCL Infosystems Ltd, Noida, India",
    responsibilities: [
      "Worked as contractual employee from HCL Infosystems LTD, deployed in NIC",
      "Development in CIPA (Common Integrated Police Application), for upgradation as CIPRUS for state specific requirements. Technologies used are JAVA, Swings, JDBC and implemented under open source environment viz. Linux (OS), PostgreSQL (RDBMS).",
      "Added code for new requirements",
      "Worked with team to guide for assigned task.",
      "Fixed bugs identified by support team and shared through Jira",
      "Worked with vendor and project management team on a code change and new fix in upcoming Release.",
      "The Common Integrated Police Application (CIPA) is a multilingual application to automate the processes (workflow) at primary sources of data itself e.g. Police Station and to build a crime & criminal Information system based on CrPC. It provides an efficient way of organizing crime records for generating queries/reports and crime analysis for decision support."
    ]
  },
  {
    title: "Software Developer",
    tenure: "Sept 2009 to Feb 2011",
    company: "GreenApple WebWare, New Delhi, India",
    responsibilities: [
      "Development in Online Shopping Cart Application using java, JSP, Servlets, JDBC, Apache tomcat 5, HTML, CSS, jQuery, AJAX",
      "Worked with team to guide for assigned task.",
      "Fixed bugs identified by support team and shared through Jira",
      "Worked with vendor and project management team on a code change and new fix in upcoming Release."
    ]
  }
];




export default Resume