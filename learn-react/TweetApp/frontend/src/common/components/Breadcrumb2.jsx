import React from 'react';
import './Breadcrumb2.css';

const styles = {
  ul: {
    listStyleType: 'none',
    margin: '0',
    padding: '2em',
    color: '#333',
  },
  li: {
    display: 'inline-block',
    position: 'relative',
    paddingRight: '2em',
    margin: '0',
    overflow: 'hidden',
  },
  liAfter: {
    content: '">"',
    position: 'absolute',
    display: 'inline-block',
    right: '0',
    width: '2em',
    textAlign: 'center',
    background: 'rgb(227,227,227)',
    backgroundImage: 'linear-gradient(90deg, rgba(227,227,227,0.4) 0%, rgba(227,227,227,1) 35%)',
    paddingLeft: '1em',
  },
  liLastChild: {
    fontWeight: 'bold',
  },
  liLastChildAfter: {
    content: '""',
  },
  a: {
    textDecoration: 'none',
    display: 'inline-block',
    color: '#333',
    whiteSpace: 'nowrap',
    maxWidth: '2em',
    transition: 'max-width 300ms ease-in-out',
  },
  aHover: {
    textDecoration: 'underline',
    maxWidth: '1000px',
  },
  liHover: {
    paddingLeft: '0em',
    background: 'transparent',
  }
};

const Breadcrumb = () => {
  return (
    <ul style={styles.ul}>
      {[
        { text: 'Home', href: '#' },
        { text: 'First link', href: '#' },
        { text: 'Second link', href: '#' },
        { text: 'Another lengthier link', href: '#' },
        { text: 'Final link in the hierarchy', href: '#' },
        { text: 'Current page', href: null }
      ].map((item, index, array) => (
        <li
          key={index}
          style={{ 
            ...styles.li, 
            ...(index === array.length - 1 ? styles.liLastChild : {}) 
          }}
        >
          {item.href ? (
            <a 
              href={item.href} 
              style={styles.a}
              onMouseEnter={e => e.target.style.maxWidth = styles.aHover.maxWidth}
              onMouseLeave={e => e.target.style.maxWidth = styles.a.maxWidth}
            >
              {item.text}
            </a>
          ) : (
            item.text
          )}
          <span
            style={index === array.length - 1 ? styles.liLastChildAfter : styles.liAfter}
          />
        </li>
      ))}
    </ul>
  );
};

export default Breadcrumb;
