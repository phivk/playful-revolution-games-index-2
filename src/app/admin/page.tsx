'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // Redirect to the static Decap CMS entry point
    // This allows Next.js to handle the route while loading the CMS from public/admin
    window.location.href = '/admin/index.html';
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: '#FAFAF7'
    }}>
      <p>Loading Content Manager...</p>
    </div>
  );
}
