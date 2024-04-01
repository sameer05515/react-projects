import React, { useState } from "react";
import DynamicFormRenderer from "./form/render/DynamicFormRenderer";
import DynamicDataRenderer from "./data/render/DynamicDataRenderer";

const DyanmicFormDashboard = () => {
  // const formSchema = {
  //     name: {
  //         label: 'Name',
  //         type: 'text'
  //     },
  //     email: {
  //         label: 'Email',
  //         type: 'email'
  //     },
  //     password: {
  //         label: 'Password',
  //         type: 'password'
  //     }
  // };

  const formSchema = {
    name: {
      label: "Name",
      type: "text",
    },
    email: {
      label: "Email",
      type: "email",
    },
    password: {
      label: "Password",
      type: "password",
    },
    age: {
      label: "Age",
      type: "number",
    },
    bio: {
      label: "Bio",
      type: "textarea",
    },
    gender: {
      label: "Gender",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    subscribe: {
      label: "Subscribe to Newsletter",
      type: "checkbox",
    },
  };

  const [submittedData, setSubmittedData] = useState(null);
  // const [submittedData, setSubmittedData] = useState({
  //   "rawText": "company: Zycus Infotech\nmodeOfWork: WFH\nofficeAddress: Bangalore\nemploymentType: Permanent\naboutCompany: |\n  The company is good.\n  I love to work here\ndomainOfCompany: \n  - Product-based\n  - Procurement domain\ncompanyWebsiteURL: https://www.zycus.com/\noverAllTenure: June 2023 to Feb 2024\nlastDesignation: SENIOR STAFF ENGINEER\nHighlights:\n  - Development in “ESG Lythouse” application. Technologies used are Java/J2EE, Spring Boot, Spring GraphQL, MongoDB, and ReactJS.\n  - Added code for new features (Category, EU Taxonomy, Goals, Initiatives, Metrics)\n  - Worked in Agile methodology to gather requirements from clients and created Epics and created stories for implementation\n  - Worked with the team to guide for the assigned task.\n  - Worked with the implementation team to live the Lythouse application in QA and pre-prod environment for given clients.\n  - Fixed bugs identified by the QA team and shared through Jira\n\n\nemploymentHistories:\n  - tenure: June 2023 to Feb 2024\n    employeeCode: 05938\n    lastWorkingDay: 22 Feb 2024\n    dateOfJoining: 07 June 2023\n    designation: SENIOR STAFF ENGINEER\n    reasonForJoining: I was laid off from last company, EVC Ventures. Hence I was looking for new opportunity having CTC offer more than or equals my last drawn CTC at EVC Ventures.\n    reasonForChange:\n      - actual: Due to confusion from HR. They interpreted my leave request due to ill health as my absconding. So they terminated myself from service. They did not pay my notice period recovery.\n        forHR: Termination due to ill health\n    joiningCTC: 32.2 LPA\n    exitCTC: 32.2 LPA\n\nreferences:\n  - Raveendra Vaddkoot, Reporting Manager, +91-95351 07459, email@domain.com\n  - Feroz, Reporting Manager\n  - Soham Niyogi, Reporting Manager\n  - Jayant Nandulkar, Reporting Manager\n  - Manish Das, HRBP, +91 95381 21119\n  - Shrikant Irrabati , Team Lead\n  - Anurag Singh, Team-mate, +91 90293 71298\n  - Vikas Kosta, Team-mate, +9170607 28021",
  //   "textType": "yaml",
  //   "metadata": {
  //     "company": "Zycus Infotech",
  //     "modeOfWork": "WFH",
  //     "officeAddress": "Bangalore",
  //     "employmentType": "Permanent",
  //     "aboutCompany": "The company is good.\nI love to work here\n",
  //     "domainOfCompany": [
  //       "Product-based",
  //       "Procurement domain"
  //     ],
  //     "companyWebsiteURL": "https://www.zycus.com/",
  //     "overAllTenure": "June 2023 to Feb 2024",
  //     "lastDesignation": "SENIOR STAFF ENGINEER",
  //     "Highlights": [
  //       "Development in “ESG Lythouse” application. Technologies used are Java/J2EE, Spring Boot, Spring GraphQL, MongoDB, and ReactJS.",
  //       "Added code for new features (Category, EU Taxonomy, Goals, Initiatives, Metrics)",
  //       "Worked in Agile methodology to gather requirements from clients and created Epics and created stories for implementation",
  //       "Worked with the team to guide for the assigned task.",
  //       "Worked with the implementation team to live the Lythouse application in QA and pre-prod environment for given clients.",
  //       "Fixed bugs identified by the QA team and shared through Jira"
  //     ],
  //     "employmentHistories": [
  //       {
  //         "tenure": "June 2023 to Feb 2024",
  //         "employeeCode": 5938,
  //         "lastWorkingDay": "22 Feb 2024",
  //         "dateOfJoining": "07 June 2023",
  //         "designation": "SENIOR STAFF ENGINEER",
  //         "reasonForJoining": "I was laid off from last company, EVC Ventures. Hence I was looking for new opportunity having CTC offer more than or equals my last drawn CTC at EVC Ventures.",
  //         "reasonForChange": [
  //           {
  //             "actual": "Due to confusion from HR. They interpreted my leave request due to ill health as my absconding. So they terminated myself from service. They did not pay my notice period recovery.",
  //             "forHR": "Termination due to ill health"
  //           }
  //         ],
  //         "joiningCTC": "2.2 LPA",
  //         "exitCTC": "2.2 LPA"
  //       }
  //     ],
  //     "references": [
  //       "Raveendra Vaddkoot, Reporting Manager, +91-00000 00000, email@domain.com",
  //       "Feroz, Reporting Manager",
  //       "Soham Niyogi, Reporting Manager",
  //       "Jayant Nandulkar, Reporting Manager",
  //       "Manish Das, HRBP, +91 00000 00000",
  //       "Shrikant Irrabati , Team Lead",
  //       "Anurag Singh, Team-mate, +91 00000 00000",
  //       "Vikas Kosta, Team-mate, +91 00000 00000"
  //     ]
  //   },
  //   "_id": {
  //     "$oid": "66281af101cd3f3022c96a5e"
  //   }
  // });

  const handleFormSubmit = (formData) => {
    // Handle form submission here
    console.log(
      "DyanmicFormDashboard: 1st Form: with div: Form Data:",
      formData
    );
    setSubmittedData(formData);
  };

  const [secondFormSubmittedData, setSecondFormSubmittedData] = useState(null);
  const handleSecondFormSubmit = (formData) => {
    // Handle form submission here
    console.log(
      "DyanmicFormDashboard: 2nd Form: with div: Form Data:",
      formData
    );
    setSecondFormSubmittedData(JSON.parse(formData.dynamicContent));
  };

  return (
    <div>
      <DynamicFormRenderer schema={formSchema} onSubmit={handleFormSubmit} />
      {submittedData && (
        <>
          <h2>1st Form Submitted Data</h2>
          <DynamicDataRenderer data={submittedData} />
        </>
      )}

      <DynamicFormRenderer
        schema={{
          dynamicContent: {
            label: "Dynamic Content",
            type: "textarea",
          },
        }}
        onSubmit={handleSecondFormSubmit}
      />
      {secondFormSubmittedData && (
        <>
          <h2>2nd Form Submitted Data</h2>
          <DynamicDataRenderer data={secondFormSubmittedData} />
        </>
      )}
    </div>
  );
};

export default DyanmicFormDashboard;
