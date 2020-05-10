import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateExercise(props) {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios.get("http://localhost:5000/users/").then((res) => {
      console.log("ress", res);

      if (res.data.length > 0) {
        setExercise({
          ...exercise,
          users: res.data.map((user) => {
            return user.username;
          }),
          username: res.data[0].username,
        });
      }
    });
  }, []);

  const onChangeUserName = (e) => {
    setExercise({ ...exercise, username: e.target.value });
  };
  const onChangeDescription = (e) => {
    setExercise({ ...exercise, description: e.target.value });
  };
  const onChangeDuration = (e) => {
    setExercise({ ...exercise, duration: e.target.value });
  };
  const onChangeDate = (date) => {
    setExercise({ ...exercise, date: date });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      <h3>Create New Exercise</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={exercise.username}
            onChange={(e) => onChangeUserName(e)}
          >
            {exercise.users.map(function (user) {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={exercise.description}
            onChange={(e) => onChangeDescription(e)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={exercise.duration}
            onChange={(e) => onChangeDuration(e)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={exercise.date}
              onChange={(date) => onChangeDate(date)}
            />
          </div>
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Exercise Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default CreateExercise;
