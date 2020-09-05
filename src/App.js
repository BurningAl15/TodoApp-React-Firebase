//{useState} is needed to call useState in the script
import React, { useState,useEffect } from "react";
import "./App.css";
import {Button, FormControl, Input, InputLabel} from "@material-ui/core"
import Todo from "./Components/Todo"

import db from "./firebase";

import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState(['abc','def']);
  const [input, setInput] = useState("");

  //When the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //this codes triggers when the app.js loads
    //with this, we call data from firebase so we get the data i stored before
    db.collection('todos').orderBy('timestamp','asc').onSnapshot(snapshot=>{
      // console.log(setTodos(snapshot.docs.map(doc=>doc.data().todo)))
      setTodos(snapshot.docs.map(doc=>doc.data().todo))
    })
  }, []);


  const addTodo = (event) => {
    //We use this to prevent from refresh the page, if we refresh, we will lost the input data and
    //Everything in todos list.
    event.preventDefault();

    db.collection('todos').add({
      todo:input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    //Adds the input to the end of the todos
    setTodos([...todos, input]);

    //Use the setState, in this case setInput, if you do
    //input='', the app will break
    //With this, we clear the input
    setInput("");
  };

  return (
    <div className="App">
      <h1>Hello World </h1>

      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input}
          onChange={(event) => setInput(event.target.value)} />
        </FormControl>

        <Button disabled={!input}  type="submit" onClick={addTodo} variant="contained" color="primary">
          Add todo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo}></Todo>
        ))}
      </ul>
    </div>
  );
}

export default App;
