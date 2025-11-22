import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../../common/components/custom-button/CustomButton";
import ToggleablePanel from "../../../common/components/toggleable-panel/ToggleablePanel";
import { SmartPreviewer } from "../../../common/components/Smart/Editor/v3";
import JSONDataViewer from "../../../common/components/json-data-viewer/JSONDataViewer";
import {
  fetchLinksByUniqueId,
  selectLinksStateCombined,
  selectNextLinkUniqueId,
  selectPrevLinkUniqueId,
  setSelectedLinkUniqueId,
} from "../../../redux/slices/linksSlice";
import Breadcrumbs from "./Breadcrumbs";

// -----------------------------------------------------------------------------
// View single link: metadata, descriptions, children
// -----------------------------------------------------------------------------
const ViewLink = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { linkDetails, linkDetailsLoading, linkDetailsError } = useSelector(selectLinksStateCombined);
  const nextLinkId = useSelector(selectNextLinkUniqueId);
  const prevLinkId = useSelector(selectPrevLinkUniqueId);

  useEffect(() => {
    if (id) {
      dispatch(setSelectedLinkUniqueId(id));
      dispatch(fetchLinksByUniqueId(id));
    }
  }, [dispatch, id]);

  const goToLink = (item) => navigate(`/links-mgmt/${item.uniqueId}`);
  const goToCreate = (parentId) => {
    navigate({
      pathname: "/links-mgmt/create",
      search: parentId ? createSearchParams({ parent: parentId }).toString() : "",
    });
  };

  if (linkDetailsLoading === "pending") {
    return (
      <div className="flex items-center justify-center min-h-[12rem] rounded-lg border border-gray-200 bg-gray-50/50">
        <span className="text-sm font-medium text-gray-500">Loading link…</span>
      </div>
    );
  }

  if (linkDetailsError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 text-sm font-medium" role="alert">
        Error: {linkDetailsError}
      </div>
    );
  }

  if (!linkDetails) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
        No link selected. Choose one from the sidebar or create a new link.
      </div>
    );
  }

  const hasChildren = linkDetails.children?.length > 0;

  return (
    <div className="space-y-8">
      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <CustomButton onClick={() => navigate(`/links-mgmt/${id}/edit`)}>
          Edit
        </CustomButton>
        <CustomButton onClick={() => goToCreate(id)}>Add Child</CustomButton>
        <CustomButton onClick={() => goToCreate(linkDetails.parentId ?? "")}>
          Add Sibling
        </CustomButton>
        <div className="inline-flex items-center gap-1 border-l border-gray-200 pl-2 ml-1">
          <CustomButton
            onClick={() => prevLinkId && navigate(`/links-mgmt/${prevLinkId}`)}
            disabled={!prevLinkId}
            title={prevLinkId ? "Previous link" : "No previous link"}
          >
            Prev
          </CustomButton>
          <CustomButton
            onClick={() => nextLinkId && navigate(`/links-mgmt/${nextLinkId}`)}
            disabled={!nextLinkId}
            title={nextLinkId ? "Next link" : "No next link"}
          >
            Next
          </CustomButton>
        </div>
        <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
      </div>

      {/* Breadcrumb + metadata */}
      <Breadcrumbs ancestors={linkDetails.ancestors} />
      <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-4">
        <dl className="grid gap-3 text-sm">
          <div>
            <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Name</dt>
            <dd className="mt-0.5 font-medium text-gray-900">{linkDetails.name}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">Type</dt>
            <dd className="mt-0.5 font-medium text-gray-900">{linkDetails.linkType}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-500 uppercase tracking-wide text-xs">URL</dt>
            <dd className="mt-0.5">
              <a
                href={linkDetails.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 hover:underline break-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
              >
                {linkDetails.linkUrl}
              </a>
            </dd>
          </div>
        </dl>
      </div>

      {/* Descriptions */}
      {linkDetails.descriptions?.length > 0 && (
        <div>
          <ToggleablePanel showContent title="Descriptions">
            {linkDetails.descriptions.map((descr, idx) => (
              <ToggleablePanel
                key={idx}
                showContent={linkDetails.descriptions.length === 1}
                title={`Description #${idx + 1}`}
              >
                <SmartPreviewer data={descr} />
              </ToggleablePanel>
            ))}
          </ToggleablePanel>
        </div>
      )}

      {/* Children */}
      <section className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Children</h3>
        {hasChildren ? (
          <ul className="space-y-2">
            {linkDetails.children.map((child) => (
              <li key={child.uniqueId}>
                <button
                  type="button"
                  onClick={() => goToLink(child)}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded px-1 -ml-1"
                >
                  {child.name}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No children yet.</p>
        )}
      </section>

      <div className="pt-4 border-t border-gray-200">
        <JSONDataViewer metadata={{ linkDetails }} title="Raw link details" />
      </div>
    </div>
  );
};

export default ViewLink;
