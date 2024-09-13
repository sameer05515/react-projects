import MainHeader from '@/components/news-room-sub-components/main-header/v2';
import './globals.css';

export const metadata = {
  title: 'spp-analytics Page Routing & Rendering',
  description: 'spp-analytics: Learn how to route to different pages.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div id='page'>
          <MainHeader />
          {children}
        </div>
      </body>
    </html>
  )
}
