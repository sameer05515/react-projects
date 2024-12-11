// src/app/dummy-welcome/[name]/page.tsx

"use client"

import { useParams } from 'next/navigation';

const WelcomeNamePage = () => {
  const params = useParams();
  const { name } = params;

  return (
    <div style={styles.container}>
      <h1>Welcome, {name}!</h1>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as 'center',
    padding: '20px',
  },
};

export default WelcomeNamePage;
