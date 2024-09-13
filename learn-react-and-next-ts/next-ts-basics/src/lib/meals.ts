import sql, { Database } from "better-sqlite3";
import xss from "xss";
import fs from "node:fs";
import { error } from "node:console";

// Type for a meal entry, adjust it based on your actual table structure
type MealItemProps = {
  id: number;
  slug: string;
  title: string;
  image: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

const db: Database = sql("meals.db");

export async function getMeals(): Promise<MealItemProps[]> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data: MealItemProps[] = db
    .prepare("SELECT * from meals")
    .all() as MealItemProps[];
  // throw new Error('Loading failed!');
  // console.log(JSON.stringify(data, null, 2));
  return data.filter(({ id }) => id !== 1);
}

export function getMeal(slug: string): MealItemProps {
  return db
    .prepare("SELECT * FROM meals WHERE slug = ?")
    .get(slug) as MealItemProps;
}

export function saveMeal(meal: MealItemProps) {
  meal.slug = slugify(meal.title);
  meal.instructions = xss(meal.instructions);
  //const extention = meal.image?.name.split(".").pop();
  //const fileName = `${meal.slug}.${extention}`;
  //const stream = fs.createWriteStream(`public/images/${fileName}`);
  //const bufferedImage=meal.image.arrayBuffer();

  // stream.write(Buffer.from(bufferedImage), (error)=>{
  //   if(error){
  //     throw new Error('Saving Image failed!!');
  //   }
  // });

  // meal.image=`/images/${fileName}`;
  meal.creator="Prem";
  meal.image='/images/curry.jpg';

  db.prepare(`
    INSERT INTO meals
    (slug, title, summary, instructions, creator, creator_email, image)
    VALUES(
      @slug,
      @title,      
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image
    )`).run(meal);
}

function slugify(input: string): string {
  // Replace spaces with hyphens first, then remove all characters except A-Za-z0-9 and hyphens
  return input
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^A-Za-z0-9-]/g, "") // Remove characters other than A-Za-z0-9 and hyphen
    .toLowerCase();
}
