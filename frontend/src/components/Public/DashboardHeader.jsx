import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faDumbbell, 
    faCalendarAlt, 
    faUser, 
    faSignOutAlt 
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
// import useAuth from '../hooks/useAuth'; // Import the useAuth hook

const themeColors = {
    background: "#0F172A",
    primary: "#1E293B",
    accent: "#F59E0B",
    text: "#FFFFFF",
    secondaryText: "#94A3B8"
};

const DashboardHeader = () => {
    // const { isManager, isAdmin, username } = useAuth(); // Now useAuth is defined
    const navigate = useNavigate();

    return (
        <AppBar position="static" sx={{ 
            backgroundColor: themeColors.primary,
            boxShadow: 'none',
            py: 1
        }}>
            <Toolbar>
                <Typography variant="h4" sx={{
                    flexGrow: 1,
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #F59E0B 30%, #FCD34D 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Motiv8 Gym
                    </Link>
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <IconButton 
                        color="inherit" 
                        onClick={() => navigate('/programs')}
                        sx={{ '&:hover': { color: themeColors.accent } }}
                    >
                        <FontAwesomeIcon icon={faDumbbell} />
                        <Typography variant="body2" sx={{ ml: 1 }}>Programs</Typography>
                    </IconButton>

                    {/* {(isAdmin || isManager) && ( // Now this conditional rendering will work
                        <IconButton 
                            color="inherit"
                            onClick={() => navigate('/schedule')}
                            sx={{ '&:hover': { color: themeColors.accent } }}
                        >
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <Typography variant="body2" sx={{ ml: 1 }}>Schedule</Typography>
                        </IconButton>
                    )} */}

                    <IconButton 
                        color="inherit"
                        onClick={() => navigate('/profile')}
                        sx={{ '&:hover': { color: themeColors.accent } }}
                    >
                        <FontAwesomeIcon icon={faUser} />
                        {/* <Typography variant="body2" sx={{ ml: 1 }}>{username}</Typography> Now username can be displayed */}
                    </IconButton>

                    <IconButton 
                        color="inherit" 
                        onClick={() => navigate('/logout')}
                        sx={{ '&:hover': { color: themeColors.accent } }}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default DashboardHeader;