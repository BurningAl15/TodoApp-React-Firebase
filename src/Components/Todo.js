import React, { useState } from "react";
import {
  List,
  ListItemText,
  ListItem,
  Button,
  ListItemAvatar,
  Modal,
} from "@material-ui/core";

import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

import { makeStyles } from "@material-ui/core/styles";

import lightBlue from "@material-ui/core/colors/lightBlue";
import db from "../firebase";
import "../Styles/Todo.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

function Todo(props) {
  const lightBlue_Color = lightBlue[50];

  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [input, setInput] = useState('');

  const updateTodo = () => {
    //Update the todo with new input text
    
    //Don't forget the merge:true, is to not override what is already in there
    db.collection('todos').doc(props.todo.id).set({
      todo:input
    },{merge:true});

    setOpen(false);
  };

  return (
    <React.Fragment>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>Open</h1>

          <input
            value={input}
            placeholder={props.todo.todo}
            onChange={(event) => setInput(event.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            className="button"
            disabled={!input}
            onClick={(e) => updateTodo()}
          >
            <EditIcon color={lightBlue_Color} className="clickable-icon" />
          </Button>

          {/* <button onClick={(e) => setOpen(false)}>x</button> */}
        </div>
      </Modal>

      <List className="list">
        <ListItem className="task">
          <ListItemAvatar>
            <AssignmentTurnedInIcon className="task-icon" />
          </ListItemAvatar>
          <ListItemText
            primary={props.todo.todo}
            secondary="Trying to look cool"
          />
          {/* <button>Edit</button> */}

          <Button
            variant="contained"
            color="primary"
            className="button"
            onClick={(e) => setOpen(true)}
          >
            <EditIcon color={lightBlue_Color} className="clickable-icon" />
          </Button>

          <Button
            variant="contained"
            color="secondary"
            className="button"
            onClick={(event) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
          >
            <DeleteForeverOutlinedIcon
              color={lightBlue_Color}
              className="clickable-icon"
            />
          </Button>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

export default Todo;
