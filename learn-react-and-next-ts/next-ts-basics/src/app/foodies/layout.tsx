import MainHeader from '@/components/foodies-sub-components/main-header/main-header';
import './globals.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>


        <MainHeader/>

        {children}
      </body>
    </html>
  );
}
