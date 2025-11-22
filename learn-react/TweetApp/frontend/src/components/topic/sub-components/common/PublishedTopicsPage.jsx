import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_APPLICATION_BASE_URL } from "../../../../common/constants/globalConstants";
import { useFetchByUrl } from "../../../../common/hooks/useDataFetching";
import Tree from "../../../../common/components/tree-viewer/TreeViewer";
import TooltipSpan from "../../../../common/components/tooltip-span/TooltipSpan";

const PublishedTopicsPage = () => {
  const navigate = useNavigate();
  const url = useMemo(
    () => `${BACKEND_APPLICATION_BASE_URL}/topics/published`,
    []
  );
  const { data: topics, loading, error } = useFetchByUrl({ url });

  const handleTopicClick = (topic) => {
    navigate(`/topic-mgmt/${topic.uniqueId}`);
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-slate-600">Loading published topics…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">Error: {typeof error === "string" ? error : error?.message}</p>
        <button
          type="button"
          onClick={() => navigate("/topic-mgmt")}
          className="mt-2 text-blue-600 hover:underline"
        >
          Back to Topics
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/topic-mgmt")}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Topics
        </button>
      </div>
      <h2 className="text-xl font-semibold text-slate-800 mb-2">
        Published Topics
      </h2>
      <p className="text-slate-600 text-sm mb-4">
        Only published topics are shown. Click a topic to view it.
      </p>
      {topics && topics.length > 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <Tree
            data={topics}
            uniqueIdFieldName="uniqueId"
            errorMessageOnNoData="No published topics yet."
            renderNode={(topic) => (
              <span
                className="text-sm cursor-pointer text-blue-700 hover:text-blue-900 hover:underline"
                onClick={() => handleTopicClick(topic)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleTopicClick(topic);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <TooltipSpan maxCharLength={40} text={topic.name} />
              </span>
            )}
          />
        </div>
      ) : (
        <p className="text-slate-500 text-sm">No published topics yet.</p>
      )}
    </div>
  );
};

export default PublishedTopicsPage;
