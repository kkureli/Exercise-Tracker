import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

function CreateUser(props) {
  const [userName, setUserName] = useState({ username: "" });

  const onChangeUserName = (e) => {
    setUserName({ username: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/users/add", userName)
      .then((res) => console.log(res.data)); // routes/user'daki res.json res.data oluyor
    props.history.push("/");
  };

  return (
    <div>
      <h3>Create New User!</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={userName.username}
            onChange={(e) => onChangeUserName(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default withRouter(CreateUser);
