import Link from "next/link";
import "../globals.css";

export default function AboutPage() {
  return (
    <main>
      <h1>About us!!</h1>
      {["page-1", "page-2"].map((aaa, idx) => (
        <>
          <Link key={`id_${idx + 1}`} href={`/about/${aaa}`}>
            {aaa}
          </Link>{" "}
          <br />
        </>
      ))}
    </main>
  );
}
