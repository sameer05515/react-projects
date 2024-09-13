import { getAvailableNewsYears } from "@/lib/news-room/news";
import Link from "next/link";
import React from "react";

const ArchivePage = () => {
  const links = getAvailableNewsYears();
  return (
    <header id="archive-header">
      <nav>
        <ul>
          {links.map((link) => (
            <li>
              <Link href={`/news-room/archive-old/${link}`}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default ArchivePage;
