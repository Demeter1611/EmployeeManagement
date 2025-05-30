import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberDashboard from './MemberDashboard';
import ManagerDashboard from './ManagerDashboard';
import { Box } from '@mui/material';

function DashboardRouter(){
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserJSON = localStorage.getItem('user');
        if(storedUserJSON){
            try{
                const storedUser = JSON.parse(storedUserJSON);
                setUserRole(storedUser.role);
            } catch (error) {
                console.error('Error parsing user data from localStorage in DashboardRouter:', error);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);
    console.log(userRole);
    if(userRole === 'MANAGER'){
        return <Box>
            <ManagerDashboard />
        </Box>;
    } else if (userRole === 'MEMBER'){
        return <Box>
            <MemberDashboard />
        </Box>;
    } else {
        navigate('/login');
    }
}

export default DashboardRouter;