import React from "react";
import { Link } from "react-router-dom";
function ExerciseMapper({ onDelete, exercises }) {
  const mapper = (exercises) => {
    return (
      exercises &&
      exercises.exercises.map((exercise) => {
        return (
          <tr key={exercise._id}>
            <td>{exercise.username}</td>
            <td>{exercise.description}</td>
            <td>{exercise.duration}</td>
            <td>{exercise.date.substring(0, 10)}</td>
            <td>
              <Link to={"/edit/" + exercise._id}>edit</Link>
              <span> | </span>
              <a href="#" onClick={() => onDelete(exercise._id)}>
                delete
              </a>
            </td>
          </tr>
        );
      })
    );
  };

  return <>{mapper(exercises)}</>;
}

export default ExerciseMapper;
