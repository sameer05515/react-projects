import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import { formatDateToDDMMMYYYYWithTime } from "../../../../common/service/commonService";
import { selectAllFlatTopics, selectTopicsStateCombined } from "../../../../redux/slices/topicSlice";
import CreateTopic from "../common/CreateTopic";
import TopicCard from "../common/TopicCard";

function ListTopicsByCreatedDate() {
  // ✅ Optimized: Use combined selector for status and error, separate for flatTopics
  const topics = useSelector(selectAllFlatTopics);
  const { status, error } = useSelector((state: RootState) => selectTopicsStateCombined(state)); // ✅ Standardized: loading -> status
  const [showForm, setShowForm] = useState(false);

  const [editTopic, setEditTopic] = useState(null);
  const [startDate, setStartDate] = useState(""); // Start date for date range filter
  const [endDate, setEndDate] = useState(""); // End date for date range filter

  const handleEditTopic = (topic) => {
    handleCancelEdit();
    setShowForm(true);
    setEditTopic(topic);
  };

  const handleCancelEdit = () => {
    setShowForm(false);
    setEditTopic(null);
  };

  const handleCreateOrUpdateTopic = () => {
    setShowForm(false);
  };

  const groupTopicsByOccurenceDate = (topics: any[]) => {
    // console.log(`startDate : ${startDate}, endDate : ${endDate}`);
    const groupedTopics: Record<string, any[]> = {};
    topics.forEach((topic: any) => {
      const key = (topic as any).occurenceDate;
      if (groupedTopics[key]) {
        groupedTopics[key].push(topic);
      } else {
        groupedTopics[key] = [topic];
      }
    });

    const sortedGroupedTopics = Object.entries(groupedTopics);
    sortedGroupedTopics.sort((b, a) => new Date(a[0]).getTime() - new Date(b[0]).getTime());

    const sortedGroupedTopicsObject: Record<string, any[]> = {};
    sortedGroupedTopics.forEach(([key, value]: [string, any[]]) => {
      sortedGroupedTopicsObject[key] = value as any[];
    });

    return sortedGroupedTopicsObject;
  };

  const filteredTopics = topics.filter((topic: any) => {
    if (!startDate || !endDate) {
      return true; // No filter applied
    }

    const topicDate = new Date((topic as any).occurenceDate);
    const startFilterDate = new Date(startDate);
    const endFilterDate = new Date(endDate);

    return topicDate >= startFilterDate && topicDate <= endFilterDate;
  });

  const groupedTopics = groupTopicsByOccurenceDate(filteredTopics);


  return (
    <div className="text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Topics List Grouped by Occurrence Date</h2>
      {status === "loading" && <p className="text-gray-700 dark:text-gray-300">Loading topics...</p>} {/* ✅ Standardized: use status */}
      {error && <p className="text-red-600 dark:text-red-400">Error: {error}</p>}

      {!showForm && (
        <CustomButton onClick={() => setShowForm(true)}>Add</CustomButton>
      )}

      {showForm && (
        <CreateTopic
          topic={editTopic}
          onSave={handleCreateOrUpdateTopic}
          onCancelEdit={handleCancelEdit}
        />
      )}

      {status === "succeeded" && ( // ✅ Standardized: use status
        <div className="flex flex-col">
          <div className="mb-4 flex gap-4 items-center">
            {/* Date range filter */}
            <label htmlFor="startDate" className="font-semibold text-gray-900 dark:text-gray-100">Start Date: </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <label htmlFor="endDate" className="font-semibold text-gray-900 dark:text-gray-100">End Date: </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          {Object.keys(groupedTopics).map((occurenceDate) => (
            <div key={occurenceDate} className="border border-gray-300 dark:border-gray-600 m-2.5 p-2.5 rounded bg-white dark:bg-gray-800">
              <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">{formatDateToDDMMMYYYYWithTime(occurenceDate)}</h3>
              {groupedTopics[occurenceDate].map((topic: any) => (
                <div
                  key={topic.uniqueId}
                  className="border border-gray-300 dark:border-gray-600 p-2.5 rounded-[10px] bg-gray-100 dark:bg-gray-700 mb-1.5 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  onDoubleClick={() => handleEditTopic(topic)}
                >
                  <TopicCard topic={topic} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListTopicsByCreatedDate;
