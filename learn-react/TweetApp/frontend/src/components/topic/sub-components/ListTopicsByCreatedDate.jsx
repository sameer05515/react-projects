import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatDateToDDMMMYYYYWithTime } from "../../../common/service/commonService";
import { fetchTags, selectAllFlatTags } from "../../../redux/slices/tagsSlice";
import { fetchTopics, selectAllFlatTopics } from "../../../redux/slices/topicSlice";
import CreateTopic from "./CreateTopic";
import TopicCard from "./TopicCard";
import CustomButton from "../../../common/components/custom-button/CustomButton";

function ListTopicsByCreatedDate() {
  const topics = useSelector(selectAllFlatTopics);
  const loading = useSelector((state) => state.topics.loading);
  const error = useSelector((state) => state.topics.error);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const availableTags = useSelector(selectAllFlatTags);

  const [editTopic, setEditTopic] = useState(null);
  const [startDate, setStartDate] = useState(""); // Start date for date range filter
  const [endDate, setEndDate] = useState(""); // End date for date range filter

  useEffect(() => {
    dispatch(fetchTopics());
    dispatch(fetchTags());
  }, [dispatch]);

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

  const listStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const groupStyle = {
    border: "1px solid #ccc",
    margin: "10px",
    padding: "10px",
  };

  const itemStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "10px", // Adding round borders
    backgroundColor: "#f2f2f2", // Grey background color
    marginBottom: "5px", // Adding vertical spacing of 5px
  };

  return (
    <div>
      <h2>Topics List Grouped by Occurrence Date</h2>
      {loading === "pending" && <p>Loading topics...</p>}
      {error && <p>Error: {error}</p>}

      {!showForm && <CustomButton onClick={() => setShowForm(true)}>Add</CustomButton>}

      {showForm && (
        <CreateTopic
          topic={editTopic}
          onSave={handleCreateOrUpdateTopic}
          onCancelEdit={handleCancelEdit}
        />
      )}

      {loading === "fulfilled" && (
        <div style={listStyle}>
          <div>
            {/* Date range filter */}
            <label htmlFor="startDate">Start Date: </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="endDate">End Date: </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          {Object.keys(groupedTopics).map((occurenceDate) => (
            <div key={occurenceDate} style={groupStyle}>
              <h3>{formatDateToDDMMMYYYYWithTime(occurenceDate)}</h3>
              {groupedTopics[occurenceDate].map((topic) => (
                <div
                  key={topic.topicId}
                  style={itemStyle}
                  onDoubleClick={() => handleEditTopic(topic)}
                >
                  <TopicCard topic={topic} tags={availableTags} />
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
