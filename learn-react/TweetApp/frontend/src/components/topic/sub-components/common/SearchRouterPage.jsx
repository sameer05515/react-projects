import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    useNavigate
} from "react-router-dom";
import CustomButton from "../../../../common/components/custom-button/CustomButton";
import HoverableSpan from "../../../../common/components/hoverable-span/HoverableSpan";
import {
    searchTopic,
    selectAllFlatTopics, setSearchString
} from "../../../../redux/slices/topicSlice";

const SearchRouterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      title: "",
    });
    const data = useSelector((state) => state.topics.searchedData);
    const searchString = useSelector((state) => state.topics.searchString);
    const flatData = useSelector(selectAllFlatTopics);
  
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
      navigate(`/topic-mgmt/${selectedTopic?.uniqueId}`);
    };
  
    // if (loading) {
    //     return <div>Loading...</div>;
    // }
  
    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }
  
    return (
      <>
        <h1 className="text-2xl font-bold mb-4">Search</h1>
        <div>
          <div className="flex items-center p-2.5 mb-4">
            <label htmlFor="title" className="w-[9%] font-bold">
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
          <pre className="bg-gray-100 p-2.5 rounded mb-4 overflow-auto">{JSON.stringify(criteriaList, null, 2)}</pre>
          <div className="flex items-center p-2.5 mb-4">
            <label
              htmlFor="searchOptions"
              className="w-[9%] font-bold"
            >
              Search Options
            </label>
            <div className="flex gap-4">
              {Object.keys(criteriaList).map((criteria) => (
                <div key={criteria} className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name={criteria}
                      checked={criteriaList[criteria].value}
                      onChange={handleChange}
                      disabled={!criteriaList[criteria].editable}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
                    />
                    <span className={!criteriaList[criteria].editable ? "text-gray-500" : ""}>
                      {criteria.charAt(0).toUpperCase() + criteria.slice(1)}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="flex gap-2.5 mb-4">
          <CustomButton onClick={() => handleSearch()}>Search</CustomButton>
          <CustomButton className="bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-400" onClick={() => navigate(-1)}>Back</CustomButton>
        </div>
  
        <div>
          {data && data.length > 0 && (
            <>
              <b className="text-lg font-semibold block mb-2">Search Results:- </b>
              <ul className="list-disc list-inside space-y-2">
                {data.map((t) => (
                  <li key={t.uniqueId}>
                    <HoverableSpan
                      onClick={() => onChildTopicClick(t)}
                      className="cursor-pointer text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {flatData?.find((ft) => ft.uniqueId === t.uniqueId)
                        ?.title || t.name}
                    </HoverableSpan>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </>
    );
  };

export default SearchRouterPage