import React from 'react';
import axios from 'axios';
import { Button, List, ListItem, ListItemText, Paper, Box } from '@mui/material';

function NotificationList({notifications, loading, error}) {
    const handleMarkAllRead = async () => {
        notifications.map(async notification => {
            console.log("Marking notifications as read...");
            const response = await axios.put("http://localhost:8080/api/notification/mark-as-read" , null, {
                withCredentials: true,
                params: {
                    notificationId: notification.id
                }
            })
            return response;
        })
    }

    if(loading){
        return <Box>Fetching notifications</Box>
    }
    
    if(error){
        return <Box>Error with fetching notifications</Box>
    }

    if(!notifications || notifications.length === 0){
        return <Box>No notifications found</Box>
    }

    return (
        <Paper style={{ width: '250px' }}>
            <List style={{ padding: '10px' }}>
                {notifications.map((notification) => (
                    <ListItem key={notification.id} divider>
                        <ListItemText
                            primary={notification.message}
                        />
                    </ListItem>
                ))}
            </List>
            <Button 
            sx={{
                display:'flex',
                justifyContent:'center',
                margin:'0 auto',
                width:'fit-content'
            }}
            onClick={handleMarkAllRead}>Mark all as read</Button>
        </Paper>
    )
}

export default NotificationList