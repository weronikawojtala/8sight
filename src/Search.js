import React, { useState } from "react";
import Scroll from "./Scroll";
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
    return (
      <Scroll>
        <SearchList filteredExercises={filteredExercises} />
      </Scroll>
    );
  }

  return (
    <div style={{ marginTop: "4vh" }}>
      <div className="cards">
        <div>
          <h2>Search exercises</h2>
          <input
            type="search"
            placeholder="Exercise's name"
            onChange={handleChange}
          />
        </div>
        <div></div>
        {searchList()}
      </div>
    </div>
  );
}

export default Search;
