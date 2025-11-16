import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AnswerForm from "./AnswerForm";

const CreateAnswerRouterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { id, qid } = useParams();
  const { data: initialFormData, questionName } = location.state || {};

  return (
    <AnswerForm
      questionName={questionName}
      initialFormData={initialFormData}
      onSave={() => {
        navigate(-1);
      }}
      onCancelEdit={() => navigate(-1)}
    />
  );
};

export default CreateAnswerRouterPage;
