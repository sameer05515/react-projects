import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CreateTopic from "./CreateTopic";

const CreateTopicRouterPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parentId = searchParams.get("parent");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          ← Back to Topics
        </button>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white shadow-sm p-6">
        {parentId && (
          <p className="text-sm text-slate-600 mb-4">
            Parent topic: <span className="font-medium text-slate-800">{parentId}</span>
          </p>
        )}
        <CreateTopic
          parentId={parentId}
          onSave={() => navigate(-1)}
          onCancelEdit={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default CreateTopicRouterPage;
