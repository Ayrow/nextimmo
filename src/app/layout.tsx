import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import { AuthProvider } from '../context/user/authContext';
import { AppProvider } from '../context/app/appContext';
import { ListingsProvider } from '../context/listings/listingsContext';

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
        <AuthProvider>
          <ListingsProvider>
            <body className={inter.className}>
              <Navbar />
              {children}
              <Footer />
            </body>
          </ListingsProvider>
        </AuthProvider>
      </AppProvider>
    </html>
  );
}
