import Link from "next/link";
import Image from "next/image";

import classes from "./page.module.css";
import MealsGrid from "@/components/foodies-sub-components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { fetchTopics } from "@/lib/topics";
import { Suspense } from "react";

const MealsPage = () => {
  // const topicData= await fetchTopics();
  return (
    <>
      {/* <MealsV1 /> */}
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun.
        </p>
        <p className={classes.cta}>
          <Link href={"/foodies/meals/share"}>Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense
          fallback={<p className={classes.loading}>Fetching Meals.....</p>}
        >
          <Meals />
        </Suspense>
      </main>
    </>
  );
};

const Meals = async () => {
  const mealsData = await getMeals();
  return (
    <>
      <MealsGrid meals={mealsData} />
      <pre style={{ color: "white" }}>{JSON.stringify(mealsData, null, 2)}</pre>
    </>
  );
};

export default MealsPage;

const MealsV1 = () => {
  return (
    <div>
      meals
      {["page-1", "page-2"].map((aaa, idx) => (
        <>
          <Link key={`id_${idx + 1}`} href={`/foodies/meals/${aaa}`}>
            {aaa}
          </Link>{" "}
          <br />
        </>
      ))}
    </div>
  );
};
