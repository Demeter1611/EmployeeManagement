import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { TextField, Grid, Button, Typography, Paper, Box } from '@mui/material';

function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Handle submit called")

        try{
            const response = await axios.post('http://localhost:8080/login', qs.stringify({
                username: email,
                password: password,
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            });
            
            const data = response.data;
            console.log("Login successful:", data);
            localStorage.setItem("user", JSON.stringify({
                userId: data.userId,
                role: data.role
            }));
            window.location.href = "/dashboard";

        
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || 'Login failed. Please try again.');
            }
    };

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
                }}    
            >
                <Typography variant="h5" sx={{ mb:2 }}>
                    Login
                </Typography>
                <TextField
                id="email"
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ width: '250px', mb: 2 }}
                />
                <TextField
                id="password"
                label="Password"
                type="password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ width: '250px', mb: 2 }}
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
                    onClick={handleSubmit}
                    >
                        Login
                    </Button>
                    <Button
                    variant="contained"
                    color="primary"
                    onClick = {() => {
                        window.location.href = "/register";
                    }}>
                        Register
                    </Button>
                </Box>


            </Paper>

            {error && (
                <Grid>
                    <Typography color="error">{error}</Typography>
                </Grid>
            )}
        </Grid>
    )
}

export default LoginPage;