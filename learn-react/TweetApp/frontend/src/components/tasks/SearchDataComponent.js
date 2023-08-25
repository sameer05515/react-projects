import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const SearchComponent = () => {
  const [searchResults, setSearchResults] = useState([]);
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
      <button onClick={handleSearch}>Search</button>
      {searchResults.length > 0 && (
        <div>
          <h6>Search Results:</h6>
          <ul>
            {searchResults.map((selectedItem) => (
              <li key={selectedItem?._id}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      [{" "}
                      {format(new Date(selectedItem?.date), "dd/MMM/yyyy", {
                        locale: enGB,
                      })}{" "}
                      ] -{selectedItem?.title}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Card Subtitle
                    </Card.Subtitle>
                    <Card.Text>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedItem?.htmlText,
                        }}
                      />
                    </Card.Text>

                    {selectedItem?.tags?.map((tag, _index) => (
                      <Card.Link key={_index} href="#">
                        {tag}
                      </Card.Link>
                    ))}
                    <Card.Footer>
                      <Button onClick={editData}>Edit</Button>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
