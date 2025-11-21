import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../common/components/custom-button/CustomButton";
import HoverableSpan from "../../../common/components/hoverable-span/HoverableSpan";
import {
  searchTopic,
  setSearchString,
} from "../../../redux/slices/interviewMgmtSlice";
import { useInterviewMgmt } from "../common/InterviewMgmtContextUtil";

const SearchInterviewMgmtRouterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
  });
  const data = useSelector((state) => state.interviewMgmt.searchedData);
  const searchString = useSelector((state) => state.interviewMgmt.searchString);
  // const flatData = useSelector(selectAllFlatTopics);
  const { flatData } = useInterviewMgmt();

  const [criteriaList, setCriteriaList] = useState({
    name: { value: 1, editable: false },
    description: { value: 0, editable: true },
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCriteriaList((prevFruits) => ({
      ...prevFruits,
      [name]: { ...prevFruits[name], value: checked ? 1 : 0 },
    }));
  };

  useEffect(() => {
    if (searchString && searchString.trim().length > 0) {
      setFormData((prev) => ({ ...prev, title: searchString }));
    }
  }, [searchString]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = () => {
    const searchOptions = Object.keys(criteriaList).reduce((acc, key) => {
      acc[key] = criteriaList[key].value;
      return acc;
    }, {});

    const raw = {
      searchString: formData.title,
      searchOptions: searchOptions,
    };

    dispatch(setSearchString(formData.title));
    dispatch(searchTopic(raw));
  };

  const onChildTopicClick = (selectedTopic) => {
    navigate(`/interview-mgmt/questions/${selectedTopic?.uniqueId}`);
  };

  // if (loading) {
  //     return <div>Loading...</div>;
  // }

  // if (error) {
  //     return <div>Error: {error.message}</div>;
  // }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Search</h1>
      <div className="mb-6">
        <div className="flex items-center p-2.5 mb-4">
          <label htmlFor="title" className="w-[9%] font-bold text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Search {currently only searching in name of topic. search in description will be available soon!}"
            value={formData.title}
            onChange={handleInputChange}
            className="w-[90%] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">{JSON.stringify(criteriaList, null, 2)}</pre>
        <div className="flex items-center p-2.5 mb-4">
          <label
            htmlFor="searchOptions"
            className="w-[9%] font-bold text-gray-700"
          >
            Search Options
          </label>
          <div className="flex gap-4">
            {Object.keys(criteriaList).map((criteria) => (
              <label key={criteria} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={criteria}
                  checked={criteriaList[criteria].value}
                  onChange={handleChange}
                  disabled={!criteriaList[criteria].editable}
                  className="w-4 h-4"
                />
                <span>{criteria.charAt(0).toUpperCase() + criteria.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        <CustomButton onClick={() => handleSearch()}>Search</CustomButton>
        <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
      </div>

      <div className="mt-6">
        {data && data.length > 0 ? (
          <>
            <b className="text-lg">Search Results:- </b>
            <ul className="list-disc list-inside mt-4 space-y-2">
              {data.map((t) => (
                <li key={t.uniqueId}>
                  <HoverableSpan
                    className="cursor-pointer hover:underline"
                    onClick={() => onChildTopicClick(t)}
                  >
                    {flatData?.find((ft) => ft.uniqueId === t.uniqueId)
                      ?.title || t.name}
                  </HoverableSpan>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-600">No Result Found, or Search functionality not used yet!</p>
        )}
      </div>
    </div>
  );
};

export default SearchInterviewMgmtRouterPage;
