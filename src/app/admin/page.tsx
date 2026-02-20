'use client';

export default function AdminPage() {
  return (
    <iframe
      src="/admin/index.html"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      title="Content Manager"
    />
  );
}
