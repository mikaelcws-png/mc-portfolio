import { Inter, Instrument_Serif } from 'next/font/google';
import '@/styles/globals.css';
import Nav from '@/components/Nav/Nav';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

export const metadata = {
  title: 'Mikael Cheung — Product Designer',
  description: 'From user insights to business impact.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
