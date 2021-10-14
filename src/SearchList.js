import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

function SearchList({ filteredPersons }) {
  const filtered = filteredPersons.map((person) => (
    <Link to={"/exercises/${person.id}"}>
      <Card key={person.id} person={person} />
    </Link>
  ));
  return <div>{filtered}</div>;
}

export default SearchList;
