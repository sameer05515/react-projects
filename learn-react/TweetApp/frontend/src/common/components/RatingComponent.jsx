import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const RatingComponent = ({rating:userRating, ratingScale=10, editable=false}) => {
  const [rating, setRating] = useState(userRating || 0);

  const handleRating = (value) => {
    if(editable){
        setRating(value);
    }else{
        console.log(`rating edit is : ${editable?'':'not'} enabled, Kripya apni saas ki gaand kahi aur marwayein!!`)
    }
    
  };

  return (
    <span>
      {[...Array(ratingScale)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={starValue}
            onClick={() => handleRating(starValue)}
            style={{ padding: 0 }}
          >
            {starValue <= rating ? (
              <StarIcon style={{ color: 'gold' }} />
            ) : (
              <StarBorderIcon style={{ color: 'gold' }} />
            )}
          </span>
        );
      })} <span style={{ paddingLeft:"2px", fontWeight: 'bold' }}> {rating}/{ratingScale}</span>
    </span>
  );
};

export default RatingComponent;
