import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import CustomButton from "../../common/components/custom-button/CustomButton";
import { useReduxDataFetching } from "../../common/hooks/useDataFetching";
import { fetchLinks, selectLinksStateCombined } from "../../redux/slices/linksSlice";

// -----------------------------------------------------------------------------
// Links tree (recursive) — sidebar list
// -----------------------------------------------------------------------------
const LinksTree = ({ links, onSelect, depth = 0 }) => {
  if (!links?.length) return null;
  const pl = depth === 0 ? "pl-0" : "pl-4";
  return (
    <ul className={`space-y-0.5 ${pl}`}>
      {links.map((link) => (
        <li key={link.uniqueId}>
          <button
            type="button"
            onClick={() => onSelect(link)}
            className="w-full text-left text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md px-2 py-1.5 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            {link.name}
          </button>
          <LinksTree links={link.children} onSelect={onSelect} depth={depth + 1} />
        </li>
      ))}
    </ul>
  );
};

// -----------------------------------------------------------------------------
// Layout: sidebar + main content outlet
// -----------------------------------------------------------------------------
const LinksLayout = () => {
  const navigate = useNavigate();
  useReduxDataFetching(fetchLinks, (state) => state.links);
  const { links, loading: status, error } = useSelector(selectLinksStateCombined);

  const handleCreateClick = () => navigate("create");
  const handleLinkSelect = (item) => navigate(String(item.uniqueId));

  if (status === "pending" || status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[24rem] rounded-xl border border-gray-200 bg-gray-50/50">
        <span className="text-sm font-medium text-gray-500">Loading links…</span>
      </div>
    );
  }

  if (status === "rejected" || status === "failed" || error) {
    return (
      <div className="flex items-center justify-center min-h-[24rem] rounded-xl border border-red-200 bg-red-50/80">
        <span className="text-sm font-medium text-red-700">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-72 lg:flex-shrink-0">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          <div className="mb-4 flex flex-wrap gap-2">
            <CustomButton onClick={handleCreateClick}>
              Create Link
            </CustomButton>
          </div>
          <nav className="text-sm" aria-label="Links tree">
            {links?.length > 0 ? (
              <LinksTree links={links} onSelect={handleLinkSelect} />
            ) : (
              <p className="py-3 text-gray-500 text-sm">No links yet. Create one to get started.</p>
            )}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <div className="min-h-[24rem] rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LinksLayout;
