import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const breadcrumbs = [
    { title: 'Website Root', desc: 'First Item', href: '#' },
    { title: 'Page Depth 02', desc: 'Second Item', href: '#' },
    { title: 'Page Depth 03', desc: 'Third Item', href: '#' },
    { title: 'Page Depth 04', desc: ['Fourth Item', 'With Additional Line'], href: '#' },
    { title: 'Page Depth 05', desc: null, href: '#' },
  ];

  return (
    <div className="container">
      <div className="breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <a key={index} href={crumb.href} className={index === breadcrumbs.length - 1 ? 'active' : ''}>
            <span className="breadcrumb__inner">
              <span className="breadcrumb__title">{crumb.title}</span>
              {Array.isArray(crumb.desc) ? (
                crumb.desc.map((d, i) => <span key={i} className="breadcrumb__desc">{d}</span>)
              ) : (
                crumb.desc && <span className="breadcrumb__desc">{crumb.desc}</span>
              )}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;
