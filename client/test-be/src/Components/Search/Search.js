import React, { useState } from "react";
import "./Search.scss";

const Search = ({ handleSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="search">
            <input
                className="input"
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
                placeholder="search here..."
            ></input>
            <button className="search-btn" onClick={() => handleSearch(searchValue)}>
                Search
            </button>
        </div>
    );
};

export default Search;
