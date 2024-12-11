import React from "react";
import classes from "./page.module.css";
import Image from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { placeHolder: string } }) {
  const mealData = await getMeal(params.placeHolder);
  
  if (!mealData) {
    notFound(); // Ensure handling of meal not found
  }

  return {
    title: mealData.title,
    description: mealData.summary
  }
}

const MealsDetailsPage = ({ params }: { params: { placeHolder: string } }) => {
  const mealData = getMeal(params.placeHolder);
  if(!mealData){
    notFound()
  }
  return (
    <>
      {/* <div>page{params.placeHolder}</div> */}
      <header className={classes.header}>
        <div className={classes.image}>
          {mealData.image && <Image src={mealData.image} alt={mealData.title} fill />}
        </div>
        <div className={classes.headerText}>
          <h1>{mealData.title}</h1>
          <p className={classes.creator}>
            by{" "}
            <a href={`mailto:${mealData.creator_email}`}>{mealData.creator}</a>
          </p>
          <p className={classes.summary}>{mealData.summary}</p>
        </div>
      </header>

      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: mealData.instructions.replace(/\n/g, '<br/>'),
          }}
        ></p>
      </main>
    </>
  );
};

export default MealsDetailsPage;
