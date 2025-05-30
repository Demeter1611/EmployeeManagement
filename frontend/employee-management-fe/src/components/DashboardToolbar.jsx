import React from 'react';
import { AppBar, Toolbar, Typography, Stack} from '@mui/material';
import Logout from './Logout';
import NotificationPopover from './NotificationPopover';


function DashboardToolbar({ title, notifications, notificationsLoading, notificationsError }) {
    return (
        <AppBar 
            sx={{backgroundColor: ''
            }}
            position="static"
            >
                <Toolbar sx={{justifyContent:'space-between'}}>
                    <Typography variant="h5">
                        {title}
                    </Typography>
                    <Stack direction='row' spacing={7}>
                        <NotificationPopover 
                        notifications={notifications}
                        loading={notificationsLoading}
                        error={notificationsError}/>
                        <Logout />
                    </Stack>
                </Toolbar>
        </AppBar>

    )
}
export default DashboardToolbar;