import { formData } from './forms';
import {displayData as Premi} from "./module_external";

const form = document.querySelector('form')!;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = formData(form);
  console.log(data);
});

console.log(Premi('Premendra Kumar'));