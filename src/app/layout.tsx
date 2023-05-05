import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { UserProvider } from '../context/user/userContext';
import { AppProvider } from '../context/app/appContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NextImmo',
  description: 'Find your next home',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <AppProvider>
        <UserProvider>
          <body className={inter.className}>
            <Navbar />
            {children}
            <Footer />
          </body>
        </UserProvider>
      </AppProvider>
    </html>
  );
}
