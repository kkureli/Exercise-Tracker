import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function EditExercise(props) {
  const [exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await axios.get(
          "/api/exercises/" + props.match.params.id
        );
        console.log(response.data.duration, "dur");

        setExercise({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/");
        if (response.data.length > 0) {
          const usersArray = [];
          response.data.map((user) => usersArray.push(user.username));
          setUsers(usersArray);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchExercise();
    fetchUsers();
  }, []);

  const onChangeUserName = (e) => {
    setExercise({ ...exercise, username: e.target.value });
  };
  const onChangeDescription = (e) => {
    setExercise({ ...exercise, description: e.target.value });
  };
  const onChangeDuration = (e) => {
    setExercise({ ...exercise, duration: e.target.value });
    console.log(exercise);
  };
  const onChangeDate = (date) => {
    setExercise({ ...exercise, date: date });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(exercise);

    axios
      .post("/api/exercises/update/" + props.match.params.id, exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      {console.log(exercise.duration, "dur")}
      <p>You are on the Edit Exercises component!</p>
      <div>
        <h3>Edit Exercise</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label>Username: </label>
            <select
              required
              className="form-control"
              value={exercise.username}
              onChange={(e) => onChangeUserName(e)}
            >
              {users &&
                users.map(function (user) {
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
    </div>
  );
}

export default EditExercise;
