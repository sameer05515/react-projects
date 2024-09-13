'use client';
import ImagePicker from "@/components/foodies-sub-components/image-picker/v1";
import MealsFormSubmit from "@/components/foodies-sub-components/meals-form-submit/v1";
import { shareMeal } from "@/lib/actions";
import classes from "./page.module.css";

const MealsShare = () => {
  return <ShareMealPage />;
};

export default MealsShare;

function ShareMealPage() {

  // const [state, formAction]=useActionState(shareMeal, {message:null});
 
  // async function shareMeal(formData:FormData){
  // 'use server';

  //   // const meal={
  //   //   title: formData.get('title')
  //   // }
  //   const data = Object.fromEntries(formData);

  //   console.log(data);

  // }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={shareMeal}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="creator_email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
            ></textarea>
          </p>
          <ImagePicker label="ImagePicker" name="image" />
          
          {/* {state.message && <p>{state.message }</p> } */}
          <p className={classes.actions}>
            {/* <button type="submit">Share Meal</button> */}
            <MealsFormSubmit/>
          </p>
        </form>
      </main>
    </>
  );
}
