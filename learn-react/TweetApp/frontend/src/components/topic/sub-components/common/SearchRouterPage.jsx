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
    const topicFormStyle = {};
  
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
        <h1>Search</h1>
        <div style={topicFormStyle}>
          <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <label htmlFor="title" style={{ width: "9%", fontWeight: "bold" }}>
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Search {currently only searching in name of topic. search in description will be available soon!}"
              value={formData.title}
              onChange={handleInputChange}
              style={{ width: "90%" }}
            />
          </div>
          <pre>{JSON.stringify(criteriaList)}</pre>
          <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <label
              htmlFor="searchOptions"
              style={{ width: "9%", fontWeight: "bold" }}
            >
              Search Options
            </label>
            {Object.keys(criteriaList).map((criteria) => (
              <div key={criteria}>
                <label>
                  <input
                    type="checkbox"
                    name={criteria}
                    checked={criteriaList[criteria].value}
                    onChange={handleChange}
                    disabled={!criteriaList[criteria].editable}
                  />
                  {criteria.charAt(0).toUpperCase() + criteria.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
  
        <div>
          <CustomButton onClick={() => handleSearch()}>Search</CustomButton>
          <CustomButton onClick={() => navigate(-1)}>Back</CustomButton>
        </div>
  
        <div>
          {data && data.length > 0 && (
            <>
              <b>Search Results:- </b>
              <ul>
                {data.map((t) => (
                  <li>
                    <HoverableSpan
                      key={t.uniqueId}
                      onClick={() => onChildTopicClick(t)}
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