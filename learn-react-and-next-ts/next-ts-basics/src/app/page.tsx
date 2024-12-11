// import { ProjectIntroductoryNote } from '@/common/utils/app-component-constants';
import { ProjectIntroductoryNote } from "@/common/constants/project-introduction";
import Link from "next/link";
import "./globals.css";

export default function Home() {
  return (
    <main>
      <img src="/images/old-icon.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
      <p>🔥 Let&apos;s get started! 🔥</p>

      <p style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
        {ProjectIntroductoryNote}
      </p>
      <p>
        {[
          "about",
          "dummy-welcome",
          "foodies",
          "news-room",
          "playground",
          "resume-service",
          "spp-analytics",
        ].map((aaa, idx) => (
          <>
            <Link key={`id_${idx + 1}`} href={`/${aaa}`}>
              {aaa}
            </Link>{" "}
            <br />
          </>
        ))}
      </p>
    </main>
  );
}
