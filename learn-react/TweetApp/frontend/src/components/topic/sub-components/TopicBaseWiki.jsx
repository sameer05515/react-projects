import React, { useMemo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams, createSearchParams } from "react-router-dom";
import { BACKEND_APPLICATION_BASE_URL } from "../../../common/constants/globalConstants";
import { useFetchByUrl } from "../../../common/hooks/useDataFetching";
import { SmartPreviewer } from "../../../common/components/Smart/Editor/v3";
import { getTagsForGivenIds } from "../../../redux/slices/tagsSlice";
import { formatDateToDDMMMYYYYWithTime } from "../../../common/service/commonService";

const TopicBaseWiki = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const sectionId = searchParams.get("sectionId");

  const url = useMemo(() => `${BACKEND_APPLICATION_BASE_URL}/topics/${id}`, [id]);
  const { data: topic, loading, error, refetch } = useFetchByUrl({ url });
  const sectionFetchUrl = useMemo(
    () => `${BACKEND_APPLICATION_BASE_URL}/topics/${id}/sections`,
    [id]
  );
  const { data: sectionsData, refetch: sectionsRefetch } = useFetchByUrl({ url: sectionFetchUrl });

  const filteredTags = useSelector(getTagsForGivenIds(topic?.tags || []));

  const sectionRef = useRef(null);

  useEffect(() => {
    if (id) {
      refetch();
      sectionsRefetch();
    }
  }, [id, refetch, sectionsRefetch]);

  useEffect(() => {
    if (sectionId && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [sectionId, sectionsData]);

  const tocEntries = useMemo(() => {
    const entries = [];
    if (topic?.sections?.length) {
      topic.sections.forEach((s) => {
        entries.push({ type: "section", id: s.uniqueId, label: s.name });
      });
    }
    if (topic?.children?.length) {
      entries.push({ type: "heading", label: "Subtopics" });
      topic.children.forEach((c) => {
        entries.push({ type: "child", id: c.uniqueId, label: c.name });
      });
    }
    return entries;
  }, [topic?.sections, topic?.children]);

  if (loading) return <div className="wiki-loading p-4">Loading...</div>;
  if (error) return <div className="wiki-error p-4 text-red-600">Error: {error.message || error}</div>;
  if (!topic) return <div className="p-4 text-gray-600">Topic not found.</div>;

  const handleSectionClick = (sectionUniqueId) => {
    navigate({
      pathname: `/topic-mgmt/wiki/${id}`,
      search: sectionUniqueId
        ? createSearchParams({ sectionId: sectionUniqueId }).toString()
        : "",
    });
  };

  const handleChildClick = (uniqueId) => {
    navigate(`/topic-mgmt/wiki/${uniqueId}`);
  };

  return (
    <div className="topic-wiki min-h-screen bg-[#f8f9fa]">
      <article className="wiki-article max-w-3xl mx-auto px-4 py-8 bg-white shadow-sm border border-gray-200">
        {/* Title */}
        <h1 className="wiki-title text-3xl font-serif font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">
          {topic.name}
        </h1>

        {/* Infobox (metadata) */}
        <aside className="wiki-infobox float-right w-52 ml-4 mb-4 p-3 bg-[#f8f9fa] border border-gray-200 text-sm">
          {filteredTags?.length > 0 && (
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Tags</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {filteredTags.map((tag) => (
                  <span
                    key={tag._id}
                    className="px-1.5 py-0.5 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 text-gray-800"
                    onClick={() => navigate(`/tags/${tag.uniqueId}`)}
                  >
                    {tag.title}
                  </span>
                ))}
              </div>
            </div>
          )}
          {topic.occurenceDate && (
            <div>
              <span className="font-semibold text-gray-700">Date</span>
              <p className="text-gray-600">{formatDateToDDMMMYYYYWithTime(topic.occurenceDate)}</p>
            </div>
          )}
        </aside>

        {/* Lead / description */}
        {(topic.description || topic.smartContent) && (
          <div className="wiki-lead text-gray-700 leading-relaxed mb-6 font-serif">
            {topic.smartContent ? (
              <SmartPreviewer data={topic.smartContent} />
            ) : (
              <SmartPreviewer data={{ content: topic.description || "", textOutputType: "html" }} />
            )}
          </div>
        )}

        {/* Table of contents */}
        {tocEntries.length > 0 && (
          <nav className="wiki-toc mb-8 p-4 bg-[#f8f9fa] border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Contents</h2>
            <ul className="list-decimal list-inside space-y-1 text-sm">
              {tocEntries.map((entry, idx) => {
                if (entry.type === "heading") {
                  return (
                    <li key={`h-${idx}`} className="font-semibold mt-2 text-gray-800">
                      {entry.label}
                    </li>
                  );
                }
                if (entry.type === "section") {
                  return (
                    <li key={entry.id}>
                      <button
                        type="button"
                        className="text-blue-600 hover:underline text-left"
                        onClick={() => handleSectionClick(entry.id)}
                      >
                        {entry.label}
                      </button>
                    </li>
                  );
                }
                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      className="text-blue-600 hover:underline text-left"
                      onClick={() => handleChildClick(entry.id)}
                    >
                      {entry.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Sections */}
        {sectionsData?.length > 0 && (
          <div className="wiki-sections clear-both">
            {sectionsData.map((section) => (
              <section
                key={section.uniqueId}
                ref={sectionId === section.uniqueId ? sectionRef : null}
                id={section.uniqueId}
                className={`mb-8 scroll-mt-4 ${sectionId === section.uniqueId ? "ring-2 ring-blue-300 ring-inset rounded p-2" : ""}`}
              >
                <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
                  {section.name}
                </h2>
                <div className="wiki-section-content text-gray-700 font-serif leading-relaxed">
                  <SmartPreviewer data={section.smartContent} />
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Subtopics */}
        {topic.children?.length > 0 && (
          <section className="wiki-children mt-8">
            <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-200 pb-1 mb-3">
              Subtopics
            </h2>
            <ul className="list-disc list-inside space-y-1">
              {topic.children.map((child) => (
                <li key={child.uniqueId}>
                  <button
                    type="button"
                    className="text-blue-600 hover:underline font-serif"
                    onClick={() => handleChildClick(child.uniqueId)}
                  >
                    {child.name}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Edit link */}
        <footer className="mt-10 pt-4 border-t border-gray-200 text-sm text-gray-500">
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => navigate(`/topic-mgmt/${topic.uniqueId}/edit`)}
          >
            Edit this topic
          </button>
        </footer>
      </article>
    </div>
  );
};

export default TopicBaseWiki;
