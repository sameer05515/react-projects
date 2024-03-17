import React, { useState } from "react";
import CustomButton from "../common/CustomButton";

const StepIndicator = ({ currentStep, totalSteps }) => {
  const stepIndicatorStyle = {
    display: "flex",
    alignItems: "center",
  };

  const stepStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    margin: '0 5px',
    backgroundColor: 'lightgray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally and vertically
  };

  const activeStepStyle = {
    backgroundColor: "blue", // Change this color to your preferred active step color
  };

  return (
    <div>
      <p>
        Step {currentStep} of {totalSteps}
      </p>
      <div style={stepIndicatorStyle}>
        {[...Array(totalSteps).keys()].map((step) => (
          <div
            key={step}
            style={{
              ...stepStyle,
              ...(step + 1 === currentStep ? activeStepStyle : {}),
            }}
          >
            {step+1}
          </div>
        ))}
      </div>
    </div>
  );
};

const PersonalInfoStep = ({ formData, setFormData, nextStep }) => {
  const { fullName, email, phone, address, professionalTitle } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Personal Information</h2>
      {/* <form>
          <div>
            <label>Full Name:</label>
            <input type="text" name="fullName" value={fullName} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={handleChange} />
          </div>
          <div>
            <label>Phone:</label>
            <input type="tel" name="phone" value={phone} onChange={handleChange} />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" name="address" value={address} onChange={handleChange} />
          </div>
          <div>
            <label>Professional Title:</label>
            <input type="text" name="professionalTitle" value={professionalTitle} onChange={handleChange} />
          </div>
        </form> */}
      <CustomButton onClick={nextStep}>Next</CustomButton>
    </div>
  );
};

const SummaryAndObjectiveStep = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) => {
  return (
    <div>
      <h2>Summary and Objective</h2>
      <CustomButton onClick={nextStep}>Next</CustomButton>
      <CustomButton onClick={prevStep}>Previous</CustomButton>
    </div>
  );
};

const EducationStep = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Education</h2>
      <CustomButton onClick={nextStep}>Next</CustomButton>
      <CustomButton onClick={prevStep}>Previous</CustomButton>
    </div>
  );
};

const WorkExperienceStep = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <div>
      <h2>WorkExperience</h2>
      <CustomButton onClick={nextStep}>Next</CustomButton>
      <CustomButton onClick={prevStep}>Previous</CustomButton>
    </div>
  );
};

const SkillsStep = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Skills</h2>
      <CustomButton onClick={nextStep}>Next</CustomButton>
      <CustomButton onClick={prevStep}>Previous</CustomButton>
    </div>
  );
};

const ProjectStep = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Project</h2>
      <CustomButton onClick={nextStep}>Next</CustomButton>
      <CustomButton onClick={prevStep}>Previous</CustomButton>
    </div>
  );
};

const CertificationsAndTrainingStep = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) => {
  return (
    <div>
      <h2>Certifications and Training</h2>
      <CustomButton onClick={nextStep}>Next</CustomButton>
      <CustomButton onClick={prevStep}>Previous</CustomButton>
    </div>
  );
};

const ReferenceStep = ({ formData, setFormData, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Reference</h2>
      <CustomButton onClick={nextStep}>Next</CustomButton>
      <CustomButton onClick={prevStep}>Previous</CustomButton>
    </div>
  );
};

const FinalReviewStep = ({ formData, setFormData, prevStep }) => {
  return (
    <div>
      <h2>FinalReview</h2>
      <CustomButton onClick={prevStep}>Previous</CustomButton>
    </div>
  );
};

const ResumeForm = () => {
  const [step, setStep] = useState(1);
  const resumeFormModel = {
    personalInformation: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      professionalTitle: "",
    },
    summaryAndObjective: {
      careerSummary: "",
      careerObjective: "",
    },
    education: [
      {
        degree: "",
        institution: "",
        date: "",
        gpa: "",
      },
    ],
    workExperience: [
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
        achievements: "",
      },
    ],
    skills: {
      technicalSkills: [],
      softSkills: [],
    },
    projects: [
      {
        projectDescription: "",
        projectRole: "",
        projectAchievements: "",
      },
    ],
    certificationsAndTraining: [
      {
        certificationName: "",
        issuingAuthority: "",
        date: "",
      },
    ],
    references: [
      {
        name: "",
        email: "",
        phone: "",
        relationship: "",
      },
    ],
  };

  const [formData, setFormData] = useState(resumeFormModel);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const totalSteps = 9; // Update this value as you add more steps

  return (
    <div>
      <StepIndicator currentStep={step} totalSteps={totalSteps} />
      {step === 1 && (
        <PersonalInfoStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <SummaryAndObjectiveStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <EducationStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <WorkExperienceStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 5 && (
        <SkillsStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 6 && (
        <ProjectStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 7 && (
        <CertificationsAndTrainingStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 8 && (
        <ReferenceStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 9 && (
        <FinalReviewStep
          formData={formData}
          setFormData={setFormData}
          prevStep={prevStep}
        />
      )}

      {/* Add more steps and corresponding components */}
    </div>
  );
};

export default ResumeForm;
