import Link from "next/link";
import logo from '@/assets/news-room/logo.jpg'

function HomePageOld() {
  return (
    <div id="home">
      <h1>Next.js Routing & Page Rendering</h1>
      <p>
        <Link href={"/news-room/news"}>
        15th August 1947: News
        </Link>
      </p>
      <p>
        <Link href={"/news-room/archive"}>
        Archives
        </Link>
      </p>
      <p>
        <Link href={"/news-room/archive-old"}>
        Archives-old , due to Max harami's chutiyapa
        </Link>
      </p>
    </div>
  );
}




export default function HomePage() {
  return (
    <div id="home">
      <img src={logo.src} alt="A newspaper" />
      <h1>A News Site For The Next Generation</h1>
      <p>
        Next News is here to deliver you all the latest news - concise &
        unbiased!
      </p>

      <p>
        NextNews aims to provide you with the latest news in a concise and
        unbiased manner. We strive to deliver the news in a way that is easy to
        understand and to the point. We want to keep you informed without
        overwhelming you with unnecessary information.
      </p>

      <p>
        We employ a team of dedicated journalists who are committed to
        delivering the news in a fair and unbiased manner. Our team is
        passionate about keeping you informed and up to date with the latest
        news.
      </p>

      <p>
        <Link href="/news-room/news">Read the latest news</Link>
      </p>
    </div>
  );
}
