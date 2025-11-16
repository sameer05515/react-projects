import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import CustomButton from "../../../common/components/custom-button/CustomButton";

const SearchComponent = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [tags, setTags] = useState("");
  // Add state for other search fields here

  const editData = () => {
    console.log("edit called");
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/data/search?tags=dummy",
        {
          params: {
            tags,
            // Add other search fields as query parameters here
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  return (
    <div>
      <h5>Search Data</h5>
      <div>
        <label>Tags:</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      {/* Add other search fields here */}
      <CustomButton onClick={handleSearch}>Search</CustomButton>
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h6 className="text-lg font-semibold mb-4">Search Results:</h6>
          <ul className="space-y-4">
            {searchResults.map((selectedItem) => (
              <li key={selectedItem?._id}>
                <div className="border border-gray-300 rounded-lg shadow-sm p-4">
                  <h5 className="text-lg font-semibold mb-2">
                    [{" "}
                    {format(new Date(selectedItem?.date), "dd/MMM/yyyy", {
                      locale: enGB,
                    })}{" "}
                    ] -{selectedItem?.title}
                  </h5>
                  <h6 className="mb-2 text-sm text-gray-600">
                    Card Subtitle
                  </h6>
                  <div className="mb-4">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedItem?.htmlText,
                      }}
                    />
                  </div>

                  {selectedItem?.tags?.map((tag, _index) => (
                    <span key={_index} className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm mr-2 mb-2">
                      {tag}
                    </span>
                  ))}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <CustomButton onClick={editData}>Edit</CustomButton>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
