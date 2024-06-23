const mongoose = require('mongoose');
const MyResumeModel = require('../models/MyResumeModel'); // Replace with the actual path

const mongoURI = "mongodb://127.0.0.1:27017/mongodb_test";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const upsertResume = async (resumeData) => {
  try {
    // Assume resumeData is an object containing the data for the resume
    // It should at least have 'uniqueName', 'linkedUserInfo', 'expertiseSet' properties

    const { uniqueName, linkedUserInfo, expertiseSet, professionalExperience } = resumeData;

    // Find the document with the uniqueName, if it exists, update it; otherwise, create a new one
    const result = await MyResumeModel.findOneAndUpdate(
      { uniqueName },
      {
        $set: {
          linkedUserInfo,
          expertiseSet,
          professionalExperience,
          lastModifiedDate: new Date()
        }
      },
      { upsert: true, new: true }
    );

    console.log('Upserted Resume:', result);
  } catch (error) {
    console.error('Error upserting resume:', error);
  } finally {
    mongoose.disconnect();
  }
};

const getProfessionalExperiences=()=>{
const arr=[
  {
    sequenceNo:1,
    companyName:'GreenApple WebWare, New Delhi, India',
    startDate:'Sept 2009',
    endDate:'Feb 2011',
    designations:[{name:'SOFTWARE DEVELOPER'}],
    highlights:[
      'Development in Online Shopping Cart Application using java, JSP, Servlets, JDBC, Apache tomcat 5, HTML, CSS, jQuery, AJAX',
      'Worked with team to guide for assigned task.',
      'Fixed bugs identified by support team and shared through Jira',
      'Worked with vendor and project management team on a code change and new fix in upcoming Release.'
    ]
  },

  {
    sequenceNo:2,
    companyName:'HCL Infosystems Ltd, Noida, India',
    startDate:'March 2011',
    endDate:'May 2012',
    designations:[{name:'SOFTWARE DEVELOPER'}],
    highlights:[
      'Worked as contractual employee from HCL Infosystems LTD, deployed in NIC',
      'Development in CIPA (Common Integrated Police Application), for upgradation as CIPRUS for state specific requirements. Technologies used are JAVA, Swings, JDBC and implemented under open source environment viz. Linux (OS), PostgreSQL (RDBMS).',
      'Added code for new requirements',
      'Worked with team to guide for assigned task.',
      'Fixed bugs identified by support team and shared through Jira',
      'Worked with vendor and project management team on a code change and new fix in upcoming Release.',
      'The Common Integrated Police Application (CIPA) is a multilingual application to automate the processes (workflow) at primary sources of data itself e.g. Police Station and to build a crime & criminal Information system based on CrPC. It provides an efficient way of organizing crime records for generating queries/reports and crime analysis for decision support.'
    ]
  },

  {
    sequenceNo:3,
    companyName:'Novelvox Software India Pvt Ltd (previously known as Integration Services & Technologies India PVT LTD), Faridabad, India',
    startDate:'May 2012',
    endDate:'Dec 2013',
    designations:[{name:'APPLICATION DEVELOPER'}],
    highlights:[
      'Development for iAgent web application to develop service generation module and service invocation module using Java, J2ee, JDBC, Apache Solr, Hibernate Flex4, CSS, JavaScript to develop views and backend services',
      'Developed REST services to upload Pdf documents and used Apache Solr to create indexes for all uploaded pdf documents, so that search for given text could be faster',
      'Worked in Agile mehodology to gather requirements from clients and created Epics and created stories for implementation',
      'Worked with team to guide for assigned task.',
      'Fixed bugs identified by support team and shared through Jira',
      'Worked with vendor and project management team on a code change and new fix in upcoming Release.'
    ]
  },

  {
    sequenceNo:4,
    companyName:'',
    startDate:'',
    endDate:'',
    designations:[],
    highlights:[]
  },

  {
    sequenceNo:5,
    companyName:'',
    startDate:'',
    endDate:'',
    designations:[],
    highlights:[]
  },

  {
    sequenceNo:6,
    companyName:'',
    startDate:'',
    endDate:'',
    designations:[],
    highlights:[]
  },

  {
    sequenceNo:7,
    companyName:'',
    startDate:'',
    endDate:'',
    designations:[],
    highlights:[]
  },

  {
    sequenceNo:8,
    companyName:'',
    startDate:'',
    endDate:'',
    designations:[],
    highlights:[]
  },

  {
    sequenceNo:9,
    companyName:'',
    startDate:'',
    endDate:'',
    designations:[],
    highlights:[]
  },

  {
    sequenceNo:10,
    companyName:'',
    startDate:'',
    endDate:'',
    designations:[],
    highlights:[]
  }


];


return arr;
};

// Example usage:
const sampleResumeData = {
  uniqueName: 'john_doe_resume',
  linkedUserInfo: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890'
  },
  expertiseSet: ['Web Development', 'JavaScript', 'Node.js'],
  professionalExperience: getProfessionalExperiences()
};

upsertResume(sampleResumeData);
