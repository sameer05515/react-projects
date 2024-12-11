import Link from "next/link";

export default function HomePage() {
  return (
    <div id="home">
      <h1>spp-analytics Routing & Page Rendering</h1>
      <p>
        <Link href={"/spp-analytics/analytics"}>spp-analytics</Link>
      </p>
    </div>
  );
}
