import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ExerciseMapper from "./ExerciseMapper";

function ExercisesList() {
  const [exercises, setExercises] = useState({ exercises: [] });

  useEffect(() => {
    axios.get("/api/exercises").then((res) => {
      setExercises({ exercises: res.data });
    });
  }, []);

  const onDelete = (id) => {
    axios.delete("/api/exercises/" + id);
    setExercises({
      exercises: exercises.exercises.filter((el) => el._id !== id),
    });
  };

  return (
    <div>
      <h3 className="mt-3">Logged Exercises</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration (mins)</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <ExerciseMapper
            exercises={exercises}
            onDelete={(id) => onDelete(id)}
          />
        </tbody>
      </Table>
    </div>
  );
}

export default ExercisesList;
