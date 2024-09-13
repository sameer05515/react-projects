// import React from 'react'

import { courseGoalCard } from "../common/styles";

const CourseGoal = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <article style={courseGoalCard}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button>DELETE</button>
    </article>
  );
};

export default CourseGoal;
