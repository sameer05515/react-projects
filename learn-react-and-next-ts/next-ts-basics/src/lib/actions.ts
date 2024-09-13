"use server";

import { MealItemProps } from "@/components/foodies-sub-components/meals/meal-item";
import { saveMeal } from "./meals";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const isEmptyText = (str: string) => !str || str.trim().length === 0;
const isValid = (data: MealItemProps): boolean => {
  return (
    // isEmptyText(data.creator) ||
    !isEmptyText(data.creator_email) &&
    !isEmptyText(data.summary) &&
    !isEmptyText(data.title)
  );
};
export async function shareMeal(
  /**prevState:{message:string;},*/ formData: FormData
) {
  // 'use server';

  // const meal={
  //   title: formData.get('title')
  // }
  const data: unknown = Object.fromEntries(formData);

  // if(!isValid){
  //     return {
  //         message: 'Invalid Input'
  //     };
  // }

  console.log(data);
  await saveMeal(data as MealItemProps);
  revalidatePath("/foodies/meals");
  redirect("/foodies/meals");
}
