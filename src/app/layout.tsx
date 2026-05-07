import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../messages/en.json';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fundfi Customer Portal',
  description: 'Manage your Fundfi merchant cash advance account',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextIntlClientProvider locale="en" messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
