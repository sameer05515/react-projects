// MyResumeComponent.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyResumeData } from '../../redux/myResumeSlice'; 

const MyResumeComponent = ({ uniqueId }) => {
  const dispatch = useDispatch();
  const myResumeData = useSelector((state) => state.myResume.data);
  const status = useSelector((state) => state.myResume.status);
  const error = useSelector((state) => state.myResume.error);

  useEffect(() => {
    // if (status === 'idle') {
      dispatch(fetchMyResumeData(uniqueId));
    // }
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  // Assuming myResumeData is an object with properties like uniqueName, linkedUserInfo, expertiseSet, createdDate, lastModifiedDate
  return (
    <div>
      <h2>{myResumeData?.uniqueName}</h2>
      <p>Expertise: {myResumeData?.expertiseSet.join(', ')}</p>
      <p>Created Date: {new Date(myResumeData?.createdDate).toLocaleDateString()}</p>
      <p>Last Modified Date: {new Date(myResumeData?.lastModifiedDate).toLocaleDateString()}</p>
      {/* Render other details from linkedUserInfo if needed */}
    </div>
  );
};

export default MyResumeComponent;
