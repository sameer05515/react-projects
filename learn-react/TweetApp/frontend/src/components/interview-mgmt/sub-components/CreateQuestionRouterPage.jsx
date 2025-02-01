import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import QuestionForm from "./QuestionForm";

const CreateQuestionRouterPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parent");

  return (
    <QuestionForm
      initialFormData={{ linkedCategoryId: id, parentId: parentId || "" }}
      onSave={() => {
        navigate(-1);
      }}
      onCancelEdit={() => navigate(-1)}
    />
  );
};

export default CreateQuestionRouterPage;
