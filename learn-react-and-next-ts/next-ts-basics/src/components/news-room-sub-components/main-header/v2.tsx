import Link from "next/link";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/news-room">NextNews</Link>
      </div>
      <nav>
        <ul>
          {/* <li>
            <Link href="/news-room/news">News</Link>
          </li> */}
          <li>
            <NavLink href="/news">News</NavLink>
          </li>
          <li>
            <NavLink href="/archive">Archives</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
