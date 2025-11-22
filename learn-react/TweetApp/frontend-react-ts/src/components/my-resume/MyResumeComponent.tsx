// MyResumeComponent.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyResumeData, selectMyResumeStateCombined } from '../../redux/slices/myResumeSlice';
import type { AppDispatch, RootState } from '../../redux/store';

interface MyResumeComponentProps {
  uniqueId?: string;
}

const MyResumeComponent: React.FC<MyResumeComponentProps> = ({ uniqueId }) => {
  const dispatch: AppDispatch = useDispatch();
  // ✅ Optimized: Use combined selector instead of multiple useSelector calls
  const { data: myResumeData, status, error } = useSelector((state: RootState) => selectMyResumeStateCombined(state));

  useEffect(() => {
    if (uniqueId) {
      dispatch(fetchMyResumeData(uniqueId) as any);
    }
  }, [dispatch, uniqueId]);

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
