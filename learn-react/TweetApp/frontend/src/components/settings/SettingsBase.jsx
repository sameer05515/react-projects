import React, { useState } from "react";
import { BACKEND_APPLICATION_BASE_URL } from "../../common/constants/globalConstants";
import { authenticatedFetch } from "../../common/service/authenticatedFetch";

const SettingsBase = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [exporting, setExporting] = useState(false);

  const handleExportFlat = async (path, filenamePrefix) => {
    setExporting(true);
    try {
      const response = await authenticatedFetch(
        `${BACKEND_APPLICATION_BASE_URL}${path}`
      );
      if (!response.ok) throw new Error("Export failed");
      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filenamePrefix}-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(`Error exporting (${filenamePrefix}):`, err);
    } finally {
      setExporting(false);
    }
  };

  const handleExportAllZip = async () => {
    setExporting(true);
    try {
      const response = await authenticatedFetch(
        `${BACKEND_APPLICATION_BASE_URL}/export/all-zip`
      );
      if (!response.ok) throw new Error("Export failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `export-all-${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting all (ZIP):", err);
    } finally {
      setExporting(false);
    }
  };

  const exportActions = [
    { path: "/topics/export/flat", filename: "topics-export-flat", label: "Topics", description: "All topics (name, description, smart content, hierarchy)." },
    { path: "/tasks/export/flat", filename: "tasks-export-flat", label: "Tasks", description: "All tasks (name, status, descriptions, tags, hierarchy)." },
    { path: "/tags/export/flat", filename: "tags-export-flat", label: "Tags", description: "All tags (name, description, smart content, hierarchy)." },
    { path: "/tweets/v2/export/flat", filename: "tweets-export-flat", label: "Tweets", description: "All tweets as a flat list." },
    { path: "/memory-maps/export/flat", filename: "memory-maps-export-flat", label: "Memory maps", description: "All memory maps (name, skeleton, details, references, hierarchy)." },
    { path: "/intvw-mgmt/v2/export/questions/flat", filename: "interview-questions-export-flat", label: "Interview questions", description: "All interview questions with answers array (name, heading, category, tags, hierarchy)." },
    { path: "/pinned-items/export/flat", filename: "pinned-items-export-flat", label: "Pinned items", description: "All pinned items (linked item type and id)." },
    { path: "/links/export/flat", filename: "links-export-flat", label: "Links", description: "All links (name, URL, type, description, hierarchy)." },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-tr from-slate-50 to-blue-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight drop-shadow-sm">
          Settings
        </h2>
        <p className="mt-1 text-slate-600">
          Manage your application preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <section className="bg-white shadow-lg rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">
            Appearance
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={compactView}
                onChange={(e) => setCompactView(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700">Use compact view in lists</span>
            </label>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white shadow-lg rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">
            Notifications
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-slate-700">Enable notifications</span>
            </label>
          </div>
        </section>

        {/* General */}
        <section className="bg-white shadow-lg rounded-xl p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-200 pb-2">
            General
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            More options can be added here (e.g. language, date format, default module).
          </p>
          <h4 className="text-sm font-medium text-slate-700 mb-2">Export data (flat JSON)</h4>
          <div className="flex flex-wrap gap-3">
            <div className="flex flex-col">
              <button
                type="button"
                onClick={handleExportAllZip}
                disabled={exporting}
                className="px-4 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                {exporting ? "Exporting…" : "Export all (ZIP)"}
              </button>
              <p className="mt-1 text-slate-500 text-xs max-w-[160px]">
                All topics, tasks, tags, tweets, memory maps, interview questions (with answers), pinned items, and links in one ZIP.
              </p>
            </div>
            {exportActions.map(({ path, filename, label, description }) => (
              <div key={path} className="flex flex-col">
                <button
                  type="button"
                  onClick={() => handleExportFlat(path, filename)}
                  disabled={exporting}
                  className="px-4 py-2 rounded-lg font-medium bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  {exporting ? "Exporting…" : `Export ${label}`}
                </button>
                <p className="mt-1 text-slate-500 text-xs max-w-[140px]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsBase;
