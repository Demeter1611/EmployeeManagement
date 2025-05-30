import React, { useState, useEffect} from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import Logout from '../components/Logout';
import NotificationPopover from '../components/NotificationPopover';
import { Collapse, Button, Box, AppBar, Typography, Toolbar, Stack} from '@mui/material';
import DashboardToolbar from '../components/DashboardToolbar';


function MemberDashboard() {
    const [tasks, setTasks] = useState(null);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [notifications, setNotifications] = useState(null);

    const unfinishedTasks = tasks ? tasks.filter(task => !task.finished) : [];
    const finishedTasks = tasks ? tasks.filter(task => task.finished) : [];

    const [notificationsLoading, setNotificationsLoading] = useState(true);
    const [notificationsError, setNotificationsError] = useState(null);

    const [tasksLoading, setTasksLoading] = useState(true);
    const [tasksError, setTasksError] = useState(null);

    const [showFinished, setShowFinished] = useState(false);

        useEffect(() => {
        let intervalId;
        const fetchData = async () => {
            try{
                console.log("Fetching tasks...");
                const taskResponse = await axios.get('http://localhost:8080/api/member/tasks',
                    {
                        withCredentials: true
                    }
                );
                console.log("Tasks fetched:", taskResponse.data);
                setTasks(taskResponse.data);
                setTasksLoading(false);
            } catch(error){
                setTasksError(error);
                setTasksLoading(false);
            }

            try{
                console.log("Fetching notifications...");
                const notificationResponse = await axios.get("http://localhost:8080/api/notification/get-all",
                    {
                        withCredentials: true
                    }
                );
                console.log("Notifications fetched:", notificationResponse.data);
                setNotifications(notificationResponse.data);
                setNotificationsLoading(false);
            } catch(error){
                setNotificationsError(error);
                setNotificationsLoading(false);
            }
        };
        
        fetchData();
        intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const handleToggle = (taskId) => {
        const newSelectedTasks = [...selectedTasks];
        if(newSelectedTasks.includes(taskId)){
            newSelectedTasks.splice(newSelectedTasks.indexOf(taskId), 1);
        }
        else{
            newSelectedTasks.push(taskId);
        }
        console.log("Selected tasks:", newSelectedTasks);
        setSelectedTasks(newSelectedTasks);
    }


    const handleMarkAllFinished = async () => {
        for (const taskId of selectedTasks) {
            try{
                const response = await axios.put("http://localhost:8080/api/member/mark-task-finished", null, {
                    withCredentials: true,
                    params: {
                        taskId: taskId
                    }
                });
                setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task.id === taskId ? { ...task, finished: true } : task
                    )
                );
                console.log(response.data);
            }
            catch(error){
                console.error("Error marking task as finished:", error);
            }
        }
        setSelectedTasks([]);
    }

    return (
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            minHeight:'100vh',
        }}>
            <DashboardToolbar 
            title="Member Dashboard"
            notifications={notifications}
            notificationsLoading={notificationsLoading}
            notificationsError={notificationsError}
            />
            <Box>
                <TaskList
                tasks={unfinishedTasks}
                loading={tasksLoading}
                error={tasksError}
                selectedTasks={selectedTasks}
                handleToggle={handleToggle}/>
                <Button
                onClick = {handleMarkAllFinished}
                sx={{
                    display:'block',
                    width:'100%',
                    borderRadius:'0',

                }}
                disabled={selectedTasks.length === 0}
                variant="contained"
                >
                    Mark selected tasks as finished
                </Button>

                <Button
                onClick={() => setShowFinished(!showFinished)}
                sx={{
                    display:'block',
                    width:'100%',
                    borderRadius:'0',
                    mb:1,

                }}
                variant="contained"
                >
                    {showFinished ? "Hide finished tasks" : "Show finished tasks"}
                </Button>
                <Collapse in={showFinished}>
                    <TaskList
                    tasks={finishedTasks}
                    loading={tasksLoading}
                    error={tasksError}
                    selectedTasks={selectedTasks}
                    handleToggle={handleToggle}/>
                </Collapse>
            </Box>
            
        </Box>
    )
}

export default MemberDashboard