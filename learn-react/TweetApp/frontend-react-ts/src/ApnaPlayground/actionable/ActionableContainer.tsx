import React, { useEffect, useCallback } from 'react';
import ActionableForm from "./ActionableForm";
import ActionableList from './ActionableList';
import axios from 'axios';
import GlobalConstants from "../../common/constants/globalConstants";
import CronExpressionGenerator from '../../common/components/cron-expression-generator/CronExpressionGenerator';

// Define the shape of an Activity item
interface Activity {
  id: string;
  activityName: string;
  activityDescription: string;
  recurrence: "OneTime" | "Daily";
  shouldContinue: "yes" | "no";
  startDate: string;
  endDate: string;
}

const ActionableContainer = () => {
  const [activities, setActivities] = React.useState<Activity[]>([]);
  const BASE_URL = GlobalConstants.tweetsApplicationBaseURL;
  const addActivity = async (newActivity: Activity) => {

    try {
      const response = await axios.post(`${BASE_URL}/activities`, newActivity);
      setActivities([...activities, response.data as Activity]);
    } catch (error) {
      console.error('Error creating activity:', error);
    }
   
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/activities`);
      setActivities(response.data as Activity[]);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  }, [BASE_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <ActionableForm postSaveAction={addActivity}/>
      <ActionableList activities={activities} />
      <CronExpressionGenerator/>
      
    </div>
  )
}

export default ActionableContainer
