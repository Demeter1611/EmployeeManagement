import React, { useState } from "react"
import { Popover, IconButton, Box } from "@mui/material"
import NotificationList from "./NotificationList"
import NotificationsIcon from '@mui/icons-material/Notifications';

function NotificationPopover({ notifications, loading, error }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    return(
        <Box>
            <IconButton onClick={handleClick}
            variant="contained"
            style={{
                width:'50px'
            }}><NotificationsIcon/></IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <NotificationList 
                notifications={notifications}
                loading={loading}
                error={error}/>
            </Popover>
        </Box>
    )
}

export default NotificationPopover