import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Playful Revolution Games",
  description: "A living collection of physical, social, and spontaneous games with facilitation instructions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
