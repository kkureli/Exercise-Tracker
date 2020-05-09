import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar></Navbar>
        <Route path="/" exact component={ExercisesList}></Route>
        <Route path="/edit/:id" exact component={EditExercise}></Route>
        <Route path="/create_exercise" exact component={CreateExercise}></Route>
        <Route path="/create_user" exact component={CreateUser}></Route>
      </div>
    </Router>
  );
}

export default App;
