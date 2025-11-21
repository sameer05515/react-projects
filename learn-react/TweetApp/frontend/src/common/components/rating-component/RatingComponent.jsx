import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const RatingComponent = ({
  rating: userRating,
  ratingScale = 10,
  editable = false,
  onEdit = () => { },
}) => {
  const [rating, setRating] = useState(userRating || 0);

  const handleRating = (value) => {
    if (editable) {
      setRating(value);
      onEdit(value);
    } else {
      console.log(`rating edit is : ${editable ? "" : "not"} enabled`);
    }
  };

  return (
    <div className="inline-flex items-center gap-1 text-sm text-gray-800">
      {[...Array(ratingScale)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            onClick={() => handleRating(starValue)}
            className={`p-0 ${editable ? "cursor-pointer" : ""}`}
          >
            {starValue <= rating ? (
              <StarIcon className="text-yellow-400" fontSize="small" />
            ) : (
              <StarBorderIcon className="text-yellow-400" fontSize="small" />
            )}
          </span>
        );
      })}
      <span className="font-semibold text-gray-900">
        {rating}/{ratingScale}
      </span>
    </div>
  );
};

export default RatingComponent;
