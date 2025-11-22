import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import { createTopicsBulk, fetchTopics, selectAllFlatTopics } from "../../../../redux/slices/topicSlice";

const CreateTopicBulkRouterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const flatTopics = useSelector(selectAllFlatTopics);

  const parentFromUrl = searchParams.get("parent") || "";
  /** When non-null, user has chosen a parent in the UI; reset when URL ?parent= changes. */
  const [parentIdOverride, setParentIdOverride] = useState(null);
  const [rows, setRows] = useState([{ name: "" }, { name: "" }, { name: "" }]);
  const [pasteText, setPasteText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setParentIdOverride(null);
  }, [parentFromUrl]);

  const parentId = parentIdOverride !== null ? parentIdOverride : parentFromUrl;

  const addRow = () => {
    setRows((prev) => [...prev, { name: "" }]);
  };

  const removeRow = (index) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const updateRow = (index, name) => {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, name } : r)));
  };

  const fillRowsFromPasteText = () => {
    const lines = pasteText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    if (lines.length === 0) {
      setRows([{ name: "" }]);
      return;
    }
    setRows(lines.map((name) => ({ name })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payloads = rows
      .map((r) => r.name?.trim())
      .filter(Boolean)
      .map((name) => ({
        name,
        parentId: parentId || undefined,
      }));
    if (payloads.length === 0) {
      setResult({ created: [], errors: [{ index: 0, message: "Add at least one topic name." }] });
      return;
    }
    setSubmitting(true);
    setResult(null);
    try {
      const res = await dispatch(createTopicsBulk(payloads)).unwrap();
      setResult(res);
      await dispatch(fetchTopics()).unwrap();
    } catch (err) {
      setResult({
        created: [],
        errors: [{ index: -1, message: err?.message || "Request failed." }],
      });
    } finally {
      setSubmitting(false);
    }
  };

  const createdCount = result?.created?.length ?? 0;

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
        <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-4">
          Create topics in bulk
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Enter one topic name per row. All will be created under the same parent (optional).
        </p>

        {parentId && (
          <p className="text-sm text-slate-700 mb-4 p-2 rounded bg-blue-50 border border-blue-200">
            Creating subtopics under: <strong>{flatTopics?.find((t) => t.uniqueId === parentId)?.name ?? parentId}</strong>
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center mb-6">
          <label htmlFor="bulk-parent" className="font-medium text-slate-700 sm:min-w-[7rem]">
            Parent topic:
          </label>
          <select
            id="bulk-parent"
            value={parentId}
            onChange={(e) => setParentIdOverride(e.target.value)}
            className="w-full max-w-xs px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">— None (root) —</option>
            {flatTopics?.map((t) => (
              <option key={t.uniqueId} value={t.uniqueId}>
                {t.title ?? t.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="bulk-paste" className="block font-medium text-slate-700 mb-2">
            Paste topic names (one per line)
          </label>
          <textarea
            id="bulk-paste"
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder="Topic one
Topic two
Topic three"
            rows={5}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
          />
          <button
            type="button"
            onClick={fillRowsFromPasteText}
            className="mt-2 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md border border-blue-200"
          >
            Fill list from text above
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <p className="text-sm text-slate-600 mb-2">Topic names (edit or add below):</p>
          <div className="space-y-2 mb-4">
            {rows.map((row, index) => (
              <div key={index} className="flex gap-2 items-center">
                <span className="text-slate-500 w-6 text-sm">{index + 1}.</span>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) => updateRow(index, e.target.value)}
                  placeholder="Topic name"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  disabled={rows.length <= 1}
                  className="text-red-600 hover:text-red-800 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium"
                  aria-label="Remove row"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <button
              type="button"
              onClick={addRow}
              className="px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-md border border-blue-200"
            >
              + Add row
            </button>
          </div>

          {result && (
            <div className="mb-4 p-3 rounded-md border bg-slate-50 border-slate-200">
              {createdCount > 0 && (
                <p className="text-green-700 text-sm font-medium">
                  Created {createdCount} topic{createdCount !== 1 ? "s" : ""}.
                </p>
              )}
              {result?.errors?.length > 0 && (
                <ul className="mt-1 text-red-700 text-sm list-disc list-inside">
                  {result.errors.map((err, i) => (
                    <li key={i}>
                      {err.index >= 0 ? `Row ${err.index + 1}: ` : ""}
                      {err.message}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
            <CustomButton
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating…" : "Create all"}
            </CustomButton>
            <CustomButton
              type="button"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-4 py-2 rounded-md text-sm font-medium"
              onClick={() => navigate(-1)}
            >
              Cancel
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTopicBulkRouterPage;
