import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fundfi Customer Portal',
  description: 'Manage your Fundfi merchant cash advance account',
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
