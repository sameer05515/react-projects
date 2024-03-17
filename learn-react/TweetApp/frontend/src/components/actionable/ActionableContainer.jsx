import React, { useEffect } from 'react';
import ActionableForm from "./ActionableForm";
import ActionableList from './ActionableList';
import axios from 'axios';
import GlobalConstants from "../../common/globalConstants";
import CronExpressionGenerator from '../common/CronExpressionGenerator';

const ActionableContainer = () => {
  const [activities, setActivities] = React.useState([]);
  const BASE_URL = GlobalConstants.tweetsApplicationBaseURL;
  const addActivity = async (newActivity) => {

    try {
      const response = await axios.post(`${BASE_URL}/activities`, newActivity);
      setActivities([...activities, response.data]);
    } catch (error) {
      console.error('Error creating activity:', error);
    }
   
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/activities`);
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <ActionableForm postSaveAction={addActivity}/>
      <ActionableList activities={activities} />
      <CronExpressionGenerator/>
      
    </div>
  )
}

export default ActionableContainer
