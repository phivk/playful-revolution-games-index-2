'use client';

import Script from 'next/script';

export default function NewsletterSignup() {
  return (
    <div>
      <Script
        src="https://cdn.sender.net/accounts_resources/universal.js"
        strategy="afterInteractive"
        onReady={() => {
          if (typeof window !== 'undefined' && (window as Window & { senderForms?: { render: () => void } }).senderForms) {
            (window as Window & { senderForms?: { render: () => void } }).senderForms?.render();
          }
        }}
      />
      <div className="sender-form-field" data-sender-form-id="av2RoM" />
    </div>
  );
}
