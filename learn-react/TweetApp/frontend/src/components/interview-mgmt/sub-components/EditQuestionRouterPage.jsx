import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionForm from "./QuestionForm";
import { apiRequest } from "../../../common/service/apiClient/v1";
import { BACKEND_APPLICATION_BASE_URL } from "../../../common/constants/globalConstants";

const EditQuestionRouterPage = () => {
  const navigate = useNavigate();
  const { qid } = useParams();
  const url = `${BACKEND_APPLICATION_BASE_URL}/intvw-mgmt/v2/questions/${qid}`;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetailsForId = useCallback(() => {
    setLoading(true);
    apiRequest({ method: "get", url })
      .then((response) => {
        if (response.isError) {
          setError(response.message);
        } else {
          setData(response.data);
          console.log("Details: ", response.data);
        }
      })
      .catch((err) => console.error("Some unexpected error occurred", err))
      .finally(setLoading(false));
  }, [url]);

  useEffect(() => {
    fetchDetailsForId();
  }, [fetchDetailsForId]);

  if (loading) {
    return <>Loading</>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      {data && (
        <QuestionForm
          initialFormData={data}
          onSave={() => {
            navigate(-1);
          }}
          onCancelEdit={() => navigate(-1)}
        />
      )}
    </>
  );
};

export default EditQuestionRouterPage;
