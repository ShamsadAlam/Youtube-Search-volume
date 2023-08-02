import React, { useState } from "react";
import axios from "axios";

const YouTubeSearchVolume = () => {
  const [keyword, setKeyword] = useState("");
  const [searchVolume, setSearchVolume] = useState(0);
  const [Item, SetItem] = useState([]);

  const API_KEY = "AIzaSyABO3rYdIUYDlvie06URFVgCxipWAut42g";
  const BASE_URL = "https://www.googleapis.com/youtube/v3/";

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const getSearchVolume = () => {
    const searchURL = `${BASE_URL}search`;
    const params = {
      part: "id",
      q: keyword,
      key: API_KEY,
      type: "video",
      maxResults: 100, // You can adjust the number of results to get more data.
    };

    axios
      .get(searchURL, { params })
      .then((response) => {
        const totalResults = response.data.pageInfo.totalResults;
        const totalItems = response.data.items;
        setSearchVolume(totalResults);
        SetItem(totalItems);
        console.log("Response: ", response);
        console.log("totalResults: ", totalResults);
        console.log("totalItems: ", totalItems);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  };

  return (
    <div className="container">
      <h1 style={{ marginTop: "2%" }}>Keyword Search Volume</h1>
      <div className="inside">
        <input
          className="input"
          type="text"
          value={keyword}
          onChange={handleInputChange}
          placeholder="Enter keyword"
        />
        <button className="button" onClick={getSearchVolume} title="search">
          <img
            style={{ backgroundColor: "white" }}
            src="https://upload.wikimedia.org/wikipedia/meta/thumb/7/7e/Vector_search_icon.svg/945px-Vector_search_icon.svg.png"
            alt="search"
            height="30px"
            width="30px"
          />
        </button>
      </div>
      <p className="volume">
        Search volume for "{keyword}": {searchVolume}
      </p>
      <div className="Items">
        {/* <p>Hello my name is Shamsad Alam</p> */}
        {Item.map((item, index) => (
          <>
            <p key={index}>
              {item.kind} : {item.etag}
            </p>
          </>
        ))}
      </div>
    </div>
  );
};

export default YouTubeSearchVolume;
