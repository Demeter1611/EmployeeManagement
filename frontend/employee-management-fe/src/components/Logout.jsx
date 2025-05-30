import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8080/logout', {}, {
                withCredentials: true
            });

            console.log('Logout successful:', response.data);
            localStorage.removeItem('user');

            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error.response ? error.response.data : error.message);
        };
    }

    return (
        <IconButton variant='contained' onClick={handleLogout}>
            <LogoutIcon/>
        </IconButton>
    )
}

export default Logout;