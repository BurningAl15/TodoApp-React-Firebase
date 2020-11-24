//{useState} is needed to call useState in the script
import React, { useState,useEffect } from "react";
import "./App.css";

import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import Todo from "./Components/Todo"
import db from "./firebase";
import firebase from 'firebase';

import ComputerIcon from "@material-ui/icons/Computer";
import ArtTrackIcon from "@material-ui/icons/ArtTrack";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0, 1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [owner, setOwner] = useState("");

  //When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //this codes triggers when the app.js loads
    //with this, we call data from firebase so we get the data i stored before
    db.collection('todos').orderBy('timestamp','asc').onSnapshot(snapshot=>{
      // console.log(setTodos(snapshot.docs.map(doc=>doc.data().todo)))
      setTodos(snapshot.docs.map(doc=>({id:doc.id, todo:doc.data().todo,owner:doc.data().owner,createdAt: firebase.firestore.FieldValue.serverTimestamp()}
      )))
    })
  }, []);


  const addTodo = (event) => {
    //We use this to prevent from refresh the page, if we refresh, we will lost the input data and
    //Everything in todos list.
    event.preventDefault();

    db.collection('todos').add({
      todo:input,
      owner:owner,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    //Adds the input to the end of the todos
    const obj={todo:input,owner:owner}

    // setTodos([...todos, input]);
    setTodos([...todos, obj]);

    //Use the setState, in this case setInput, if you do
    //input='', the app will break
    //With this, we clear the input
    setInput("");
    setOwner("");
  };

  return (
    <div className="App">
      <h1 className="title"> Movies W Partner </h1>

      <form>
        <FormControl>
          <InputLabel>Write a movie or serie title</InputLabel>
          <Input value={input}
          onChange={(event) => setInput(event.target.value)} />
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Owner</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={owner}
            onChange={(event) => setOwner(event.target.value)}
          >
            <MenuItem value={"Gab"}>by Gab</MenuItem>
            <MenuItem value={"Al"}>by Al</MenuItem>
          </Select>
        </FormControl>

        <Button disabled={!input}  type="submit" onClick={addTodo} variant="contained" color="primary">
          Add Content
        </Button>
      </form>

        {todos.map((todo) => (
          <Todo todo={todo}></Todo>
        ))}
    </div>
  );
}

export default App;
