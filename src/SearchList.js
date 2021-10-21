import React from "react";
import Card from "./Card";

function SearchList({ filteredExercises }) {
  const filtered = filteredExercises.map((ex) => (
    <Card key={ex.id} exercise={ex} />
  ));
  return <div>{filtered}</div>;
}

export default SearchList;
