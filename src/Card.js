import React from "react";
import Button from "react-bootstrap";

function Card({ person }) {
  return (
    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
      <div>
        <h2>{person.name}</h2>
        <p>{person.email}</p>
        {/* <Button></Button> */}
      </div>
    </div>
  );
}

export default Card;
