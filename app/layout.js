import { Cormorant_Garamond, Mulish } from 'next/font/google';
import Header from '../components/Header';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Mulish({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Calliope Editing',
    template: '%s · Calliope Editing',
  },
  description:
    'Developmental editing, line editing, copy editing, proofreading and beta reading for fantasy, romantasy, dystopian and adventure authors, adult through middle grade.',
};

export const viewport = {
  themeColor: '#FAF7F3',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
