import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DashboardToolbar from '../components/DashboardToolbar';
import LoggedInMembersList from '../components/LoggedInMembersList';
import NotificationList from '../components/NotificationList';
import Logout from '../components/Logout';
import { TextField, Box, Button } from '@mui/material';


function ManagerDashboard() {
    const [taskDescription, setTaskDescription] = useState("");
    const [notifications, setNotifications] = useState(null);
    const [members, setMembers] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([]);

    const [membersLoading, setMembersLoading] = useState(true);
    const [notificationsLoading, setNotificationsLoading] = useState(true);
    
    const [membersError, setMembersError] = useState(null);
    const [notificationsError, setNotificationsError] = useState(null);

    useEffect(() => {
        let intervalId;
        const fetchData = async () => {
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

            try{
                console.log("Fetching logged in members...");
                const membersResponse = await axios.get("http://localhost:8080/api/manager/logged-in-members",
                    {
                        withCredentials: true
                    }
                );
                console.log("Logged in members fetched:", membersResponse.data);
                setMembers(membersResponse.data);
                setMembersLoading(false);
            } catch(error){
                setMembersError(error);
                setMembersLoading(false);
            }
        }
        
        fetchData();
        intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const handleToggle = (memberId) => {
        const newSelectedMembers = [...selectedMembers];
        if (newSelectedMembers.includes(memberId)) {
            newSelectedMembers.splice(newSelectedMembers.indexOf(memberId), 1);
        }
        else {
            newSelectedMembers.push(memberId);
        }
        console.log("Selected members:", newSelectedMembers);
        setSelectedMembers(newSelectedMembers);
    }

    const handleSendTask = async () => {
        for(const selectedMember of selectedMembers){
            try{
                console.log("Sending task to member:", selectedMember);
                console.log("Task description:", taskDescription);
                const response = await axios.post("http://localhost:8080/api/manager/assigntask", 
                    null,  
                    {
                        params: {
                        description: taskDescription,
                        memberId: selectedMember,
                        },
                        withCredentials: true
                    }
                );
                console.log("Task sent:", response.data);
            } catch(error){
                console.error("Error sending task:", error);
            }
            setTaskDescription("");
        }
    }


    return (
        <Box
        sx={{
            display:'flex',
            flexDirection:'column',
            minHeight:'100vh',
        }}>

            <DashboardToolbar title="Manager Dashboard" 
            notifications = {notifications}
            notificationsError={notificationsError}
            notificationsLoading={notificationsLoading}/>

            <Box
            sx={{
                display:'flex',
                flexDirection:'row',
                flex: 1,
                minHeight: '0',
                mt: 2,
            }}>
                <LoggedInMembersList
                members={members}
                selectedMembers={selectedMembers}
                loading={membersLoading}
                error={membersError}
                handleToggle={handleToggle}/>

                <Box
                sx={{
                    flex: 1,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}>
                    <TextField 
                    fullWidth 
                    id='task-description'
                    label='Task description'
                    variant='outlined'
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    />
                    <Button variant='contained'
                    onClick = {handleSendTask}
                    disabled={selectedMembers.length === 0 || taskDescription === ""}>Send task to selected members</Button>
                </Box>
            </Box>
                
        </Box>
    )

}

export default ManagerDashboard;