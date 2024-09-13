import Link from "next/link";
import classes from './page.module.css';
import ImageSlideshow from "@/components/foodies-sub-components/images/image-slideshow";

export default function Home() {
  return (
    <>
    {/* <HomeV1/> */}
    <HomeV2/>
    </>
  );
};

const HomeV1=()=>{
  return(
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Time to get started!
        {["meals", "meals/share", "community"].map((aaa, idx) => (
          <>
            <br />
            <Link key={`id_${idx + 1}`} href={`/foodies/${aaa}`}>
              {aaa}
            </Link>
          </>
        ))}
      </h1>
    </main>
  )
};

function HomeV2() {
  return (
    <>
      <header className={classes.header}>
        <div className={classes.slideshow}>
          <ImageSlideshow/>
        </div>
        <div>
          <div className={classes.hero}>
            <h1>NextLevel Food for NextLevel Foodies</h1>
            <p>Taste & share food from all over the world.</p>
          </div>
          <div className={classes.cta}>
            <Link href="/foodies/community">Join the Community</Link>
            <Link href="/foodies/meals">Explore Meals</Link>
          </div>
        </div>
      </header>
      <main>
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes, and to
            connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
