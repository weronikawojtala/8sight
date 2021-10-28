import React, { useState } from "react";
import SearchList from "./SearchList";

function Search({ details }) {
  const [searchField, setSearchField] = useState("");

  const filteredExercises = details.filter((ex) => {
    return ex.name.toLowerCase().includes(searchField.toLowerCase());
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return <SearchList filteredExercises={filteredExercises} />;
  }

  return (
    <div style={{ marginTop: "4vh" }}>
      <div className="cards">
        <div>
          <h2 style={{ textAlign: "center" }}>Search exercises</h2>
          <input
            type="search"
            class="search-input"
            id="search"
            placeholder="Exercise's name"
            onChange={handleChange}
            style={{ margin: "auto" }}
          />
          <label for="search" class="search-label">
            Exercise's name
          </label>
        </div>
        <div></div>
        {searchList()}
      </div>
    </div>
  );
}

export default Search;
