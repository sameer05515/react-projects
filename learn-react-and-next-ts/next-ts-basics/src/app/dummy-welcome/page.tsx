// src/app/dummy-welcome/page.tsx

import Link from 'next/link';

const DummyWelcomePage = () => {
  const names = ["Alice", "Bob", "Charlie", "David"];

  return (
    <div style={styles.container}>
      <h1>Welcome Page</h1>
      <ul style={styles.list}>
        {names.map((name, index) => (
          <li key={index} style={styles.listItem}>
            {/* No need for <a> tag, Link can be used directly */}
            <Link href={`/dummy-welcome/${name}`} style={styles.link}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as 'center',
    padding: '20px',
  },
  list: {
    listStyleType: 'none' as 'none',
    padding: 0,
  },
  listItem: {
    margin: '10px 0',
  },
  link: {
    textDecoration: 'none',
    color: '#0070f3',
    fontSize: '1.2rem',
  },
};

export default DummyWelcomePage;
