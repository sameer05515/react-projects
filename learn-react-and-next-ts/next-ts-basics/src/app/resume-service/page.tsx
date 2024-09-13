'use client'

import React from "react";
import styles from "./ResumeService.module.css";

// import { useRouter } from "next/router";

import { useRouter } from 'next/navigation'

const ResumeServicePage = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/resume-service/personal-projects");
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome</h1>

      <p style={inLineStyles.description}>
        This page showcases different features and services related to resume management.
      </p>
      <button onClick={handleNavigate} style={inLineStyles.button}>
        View Personal Projects
      </button>

      <div className={styles.multilineText}>
        {`
        Here we will do not develop any functionality.
          This page only created to stream line my resume service knowledge

        About Resume Service:-
          Project Location: <ROOT>/microservices-playground/example-base-03/fontend/gui-project-01
          Purpose: 
            - I want to capture data for different sesctions of resume data and store in database.
              - To capture data for
                - Summarized introduction
                - Companies
                - Projects
                - Personal Projects
                - Educational Qualifications
                - Certifications
        
        
        `}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome</h1>
      <div className={styles.multilineText}>
        {`
        Here we will do not develop any functionality.
          This page only created to stream line my resume service knowledge

        About Resume Service:-
          Project Location: <ROOT>/microservices-playground/example-base-03/fontend/gui-project-01
          Purpose: 
            - I want to capture data for different sesctions of resume data and store in database.
              - To capture data for
                - Summarized introduction
                - Companies
                - Projects
                - Personal Projects
                - Educational Qualifications
                - Certifications
        
        
        `}
      </div>
    </div>
  );
};

// Inline styles for simplicity
const inLineStyles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#333",
  },
  description: {
    fontSize: "1.2rem",
    marginBottom: "20px",
    color: "#555",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1.1rem",
    color: "#fff",
    backgroundColor: "#0070f3",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};



export default ResumeServicePage;
