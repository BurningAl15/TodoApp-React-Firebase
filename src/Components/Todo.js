import React from 'react'
import { List, ListItemText, ListItem, Avatar, ListItemAvatar } from '@material-ui/core'

import "../Styles/Todo.css"

function Todo(props) {
    return (
        <React.Fragment>
          <List>
            <ListItemAvatar>
                {/* <Avatar>
               
                </Avatar> */}
                <ListItem>
                  <ListItemText primary={props.todo}/>
              </ListItem>
            </ListItemAvatar>

             
          </List>
        </React.Fragment>
    )
}

export default Todo

