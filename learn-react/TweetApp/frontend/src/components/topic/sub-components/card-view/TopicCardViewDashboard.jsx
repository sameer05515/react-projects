import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import { formatDateToDDMMMYYYYWithTime } from "../../../../common/service/commonService";
import { selectAllFlatTopics } from "../../../../redux/slices/topicSlice";
import CreateTopic from "../common/CreateTopic";
import TopicCard from "../common/TopicCard";

function ListTopicsByCreatedDate() {
  const topics = useSelector(selectAllFlatTopics);
  const loading = useSelector((state) => state.topics.loading);
  const error = useSelector((state) => state.topics.error);
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

  const groupTopicsByOccurenceDate = (topics) => {
    // console.log(`startDate : ${startDate}, endDate : ${endDate}`);
    const groupedTopics = {};
    topics.forEach((topic) => {
      if (groupedTopics[topic.occurenceDate]) {
        groupedTopics[topic.occurenceDate].push(topic);
      } else {
        groupedTopics[topic.occurenceDate] = [topic];
      }
    });

    const sortedGroupedTopics = Object.entries(groupedTopics);
    sortedGroupedTopics.sort((b, a) => new Date(a[0]) - new Date(b[0]));

    const sortedGroupedTopicsObject = {};
    sortedGroupedTopics.forEach(([key, value]) => {
      sortedGroupedTopicsObject[key] = value;
    });

    return sortedGroupedTopicsObject;
  };

  const filteredTopics = topics.filter((topic) => {
    if (!startDate || !endDate) {
      return true; // No filter applied
    }

    const topicDate = new Date(topic.occurenceDate);
    const startFilterDate = new Date(startDate);
    const endFilterDate = new Date(endDate);

    return topicDate >= startFilterDate && topicDate <= endFilterDate;
  });

  const groupedTopics = groupTopicsByOccurenceDate(filteredTopics);


  return (
    <div>
      <h2>Topics List Grouped by Occurrence Date</h2>
      {loading === "pending" && <p>Loading topics...</p>}
      {error && <p>Error: {error}</p>}

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

      {loading === "fulfilled" && (
        <div className="flex flex-col">
          <div className="mb-4 flex gap-4 items-center">
            {/* Date range filter */}
            <label htmlFor="startDate" className="font-semibold">Start Date: </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label htmlFor="endDate" className="font-semibold">End Date: </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {Object.keys(groupedTopics).map((occurenceDate) => (
            <div key={occurenceDate} className="border border-gray-300 m-2.5 p-2.5 rounded">
              <h3 className="text-lg font-bold mb-2">{formatDateToDDMMMYYYYWithTime(occurenceDate)}</h3>
              {groupedTopics[occurenceDate].map((topic) => (
                <div
                  key={topic.topicId}
                  className="border border-gray-300 p-2.5 rounded-[10px] bg-gray-100 mb-1.5 cursor-pointer hover:bg-gray-200 transition-colors"
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
