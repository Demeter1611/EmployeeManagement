import React from 'react';
import { Typography, List, ListItem, Button, Checkbox, Box } from '@mui/material';



function TaskList({ tasks, loading, error, selectedTasks, handleToggle }){

    if(loading){
        return <div>Fetching tasks</div>
    }

    if(error){
        return <div>Error with fetching tasks</div>
    }

    if(!tasks || tasks.length === 0){
        return <Box
        sx={{
            height: '280px',
        }}>
            <Typography
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                fontSize: '20px',
                color: 'gray'
            }}>No tasks found</Typography>
        </Box>
    }

    return (
        <Box
        sx={{
            height: '280px',
            overflowY: 'auto',
            marginBottom: '8px'
        }}
        >
            <List>
                {tasks.map((task) => (
                    <ListItem key={task.id}>
                        <Checkbox 
                            checked={selectedTasks.includes(task.id)}
                            onChange={() => handleToggle(task.id)}
                            disabled={task.finished}
                        />
                       <Typography
                       sx={{
                            textDecoration: task.finished ? 'line-through' : 'none',
                            color: task.finished ? 'gray' : 'inherit',
                        }}
                       >{task.description}</Typography> 
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
export default TaskList