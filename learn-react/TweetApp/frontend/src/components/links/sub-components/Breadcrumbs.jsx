import React, { useEffect, useState } from "react";

/**
 * Breadcrumb trail for link ancestors (Home / Parent / Current).
 */
const Breadcrumbs = ({ ancestors: providedAncestors = [] }) => {
  const [ancestors, setAncestors] = useState([]);

  useEffect(() => {
    setAncestors(Array.isArray(providedAncestors) ? [...providedAncestors] : []);
  }, [providedAncestors]);

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-gray-600">
        <li>
          <span className="font-medium text-gray-900">Home</span>
        </li>
        {ancestors.map((ancestor, index) => (
          <li key={ancestor?.uniqueId ?? index} className="flex items-center gap-x-1.5">
            <span aria-hidden className="text-gray-400 select-none">/</span>
            <span className="font-medium text-gray-900">{ancestor?.name ?? "…"}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
