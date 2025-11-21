import React from 'react';

const Breadcrumb = () => {
  const breadcrumbItems = [
    { text: 'Home', href: '#' },
    { text: 'First link', href: '#' },
    { text: 'Second link', href: '#' },
    { text: 'Another lengthier link', href: '#' },
    { text: 'Final link in the hierarchy', href: '#' },
    { text: 'Current page', href: null }
  ];

  return (
    <nav className="p-8" aria-label="Breadcrumb">
      <ul className="list-none m-0 p-0 text-gray-700 flex flex-wrap items-center">
        {breadcrumbItems.map((item, index, array) => (
          <li
            key={index}
            className={`inline-block relative pr-8 m-0 overflow-hidden ${
              index === array.length - 1 ? 'font-bold' : ''
            }`}
          >
            {item.href ? (
              <a 
                href={item.href}
                className="no-underline inline-block text-gray-700 whitespace-nowrap transition-all duration-300 hover:text-blue-600 hover:underline max-w-[2em] hover:max-w-[1000px]"
              >
                {item.text}
              </a>
            ) : (
              <span className="text-gray-900">{item.text}</span>
            )}
            {index !== array.length - 1 && (
              <span className="absolute right-0 inline-block w-8 text-center bg-gradient-to-r from-gray-200/40 to-gray-200 pl-4">
                &gt;
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
