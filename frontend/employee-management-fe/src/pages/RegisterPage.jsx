import React, {useState} from 'react';
import axios from 'axios';
import { Box, Typography, Button, TextField, Paper, Grid } from '@mui/material';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Handle submit called")

        try {
            const response = await axios.post('http://localhost:8080/register', {
                name: username,
                email: email,
                password: password,
                role: "MEMBER"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            const data = response.data;
            console.log("Registration successful:", data);
            window.location.href = "/login";

        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
        }
    }

    if(error){
        return window.href = "/register";
    }

    return (
        <Grid container
        direction = "column"
        alignItems='center'
        justifyContent={'center'}
        spacing={2}
        style={{ minHeight: '100vh'}}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    borderRadius: 3,
                    minWidth: 320,
                    backgroundColor: '#f5f7fa',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Typography variant="h5" sx={{ mb:2 }}>
                    Register
                </Typography>
                
                <TextField
                id="username"
                label="Username"
                variant="standard"
                sx={{ width: '250px', mb: 2 }}
                value = {username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                id="email"
                label="Email"
                variant="standard"
                sx={{ width: '250px', mb: 2 }}
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                id="password"
                label="Password"
                type="password"
                variant="standard"
                sx={{ width: '250px', mb: 2 }}
                value = {password}
                onChange={(e) => setPassword(e.target.value)}
                />
                
                <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 2
                }}>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}>
                        Register
                    </Button>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick = {() => {
                        window.location.href = "/login";
                    }
                    }>
                        Back to Login
                    </Button>
                </Box>
                </Paper>
        </Grid>
    )
}
export default RegisterPage;