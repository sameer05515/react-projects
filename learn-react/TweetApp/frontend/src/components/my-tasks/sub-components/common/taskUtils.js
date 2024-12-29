import { getStatusLabelForId } from "../../../../common/constants/globalConstants";

export const prepareTaskTitle = ({ name, taskStatus }, from) => {
  console.log(`source: ${from}  ==== `,JSON.stringify({ name, taskStatus }));
  if (!name || !taskStatus) {
    console.error(`invalid task object : `);
    return "Invalid task object given";
  }

  return `[**\`${getStatusLabelForId(taskStatus)}\`**]: ${name}`;
};
