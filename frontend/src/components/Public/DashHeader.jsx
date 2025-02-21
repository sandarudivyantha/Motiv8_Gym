import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Logout, PersonAdd, FitnessCenter, Paid } from '@mui/icons-material';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import useAuth from '../hooks/useAuth';

const DashHeader = () => {
  // Get the user's roles from custom authentication hook
  const { roles } = useAuth();
  
  // Mutation hook for sending a logout request
  const [sendLogout] = useSendLogoutMutation();
  
  // React Router hook for navigation
  const navigate = useNavigate();

  // Function to handle logout action
  const handleLogout = async () => {
    await sendLogout();  // Call the logout mutation
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <AppBar position="static"> {/* AppBar component for the top navigation bar */}
      <Toolbar> {/* Toolbar component for layout and styling */}
        
        {/* Gym logo and title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <IconButton color="inherit" component={Link} to="/dash"> 
            <FitnessCenter /> {/* Gym icon */}
          </IconButton>
          Motiv8 Gym Management
        </Typography>

        {/* Show 'Users' button only for Admins and Trainers */}
        {(roles.includes('Admin') || roles.includes('Trainer')) && (
          <Button color="inherit" component={Link} to="/dash/users" startIcon={<PersonAdd />}>
            Users
          </Button>
        )}

        {/* Payments button (visible to all roles) */}
        <Button color="inherit" component={Link} to="/dash/payments" startIcon={<Paid />}>
          Payments
        </Button>

        {/* Logout button */}
        <IconButton color="inherit" onClick={handleLogout}>
          <Logout />
        </IconButton>

      </Toolbar>
    </AppBar>
  );
};

export default DashHeader;
