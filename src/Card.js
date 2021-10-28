import React from "react";
import { Button } from "react-bootstrap";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";

function Card({ exercise }) {
  return (
    <div className="card">
      <div>
        <h2 style={{ textAlign: "center" }}>{exercise.name}</h2>
        <div className="note">
          <p>
            <b>Description</b>: {exercise.description}
          </p>
          <p>
            <b>Time needed to complete</b>: {exercise.time} seconds
          </p>
        </div>
        <Link to={`/exercises/${exercise.id}`}>
          <Button
            className="btn"
            size="lg"
            type="button"
            style={{ height: "40px", width: "40px" }}
          >
            <span></span>
            <span></span>
            <span></span>
            <span />
            <div>
              <ArrowForwardIosIcon
                style={{ margin: "-8px", marginBottom: "2px" }}
              />
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
