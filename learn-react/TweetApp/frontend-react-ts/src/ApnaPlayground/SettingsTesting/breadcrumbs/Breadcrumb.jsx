import React from 'react';

const Breadcrumb = () => {
  const breadcrumbs = [
    { title: 'Website Root', desc: 'First Item', href: '#' },
    { title: 'Page Depth 02', desc: 'Second Item', href: '#' },
    { title: 'Page Depth 03', desc: 'Third Item', href: '#' },
    { title: 'Page Depth 04', desc: ['Fourth Item', 'With Additional Line'], href: '#' },
    { title: 'Page Depth 05', desc: null, href: '#' },
  ];

  return (
    <div className="mx-auto max-w-5xl p-4">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-700" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <span key={index} className="inline-flex items-center">
            <button
              type="button"
              className={`rounded px-1 py-0.5 transition-colors hover:text-blue-700 ${
                index === breadcrumbs.length - 1 ? 'font-semibold text-gray-900 cursor-default hover:text-gray-900' : 'text-blue-600'
              }`}
              title={Array.isArray(crumb.desc) ? crumb.desc.join(' • ') : (crumb.desc || '')}
              disabled={index === breadcrumbs.length - 1}
            >
              {crumb.title}
            </button>
            {index < breadcrumbs.length - 1 && <span className="px-1 text-gray-400">/</span>}
          </span>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;
