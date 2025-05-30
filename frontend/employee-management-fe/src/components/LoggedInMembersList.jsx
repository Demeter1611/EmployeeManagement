import React from 'react';
import { List, ListItem, ListItemText, Typography, Box, Checkbox } from '@mui/material';

function LoggedInMembersList({members, selectedMembers, loading, error, handleToggle}){



    if(loading){
        return <Box>Fetching logged in members</Box>
    }
    if(error){
        return <Box>Error with fetching members</Box>
    }
    if(!members || members.length === 0){
        return(
            <Box
            sx={{
                width: '50%',
                marginRight: '8px',
                height: '100%',
                overflowY: 'auto',
            }}>
                <Typography
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontSize: '20px',
                    color: 'gray'
                }}>
                    No logged in members found
                </Typography>
            </Box>
        )
    }

    return (
        <Box
        style={{
            width: '50%',
            marginRight: '8px',
            height: '100%',
            overflowY: 'auto',
        }}>
            <List>
                {members.map((member) => (
                    <ListItem key={member.userId}>
                        <Checkbox 
                        checked={selectedMembers.includes(member.userId)}
                        onChange={() => handleToggle(member.userId)}/>
                        <ListItemText
                            primary={member.name}
                            secondary={member.email + " - login time: " + member.loginTime}
                        />
                    </ListItem>
                ))}
            </List>    
        </Box>
    )
}

export default LoggedInMembersList