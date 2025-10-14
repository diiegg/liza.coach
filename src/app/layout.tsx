// src/app/layout.tsx (Server Component - no "use client")
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luna Coaching',
  description: 'Life coaching for clarity, confidence, and consistent action.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
