import { useAuth } from '../../hooks/useAuth';
import { Box, Typography, Avatar, Paper, List, ListItem, ListItemText } from '@mui/material';
import { FitnessCenter } from '@mui/icons-material';

const Profile = () => {
  const { username, roles, status } = useAuth();

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
          <FitnessCenter />
        </Avatar>
        <Typography variant="h5">User Profile</Typography>
      </Box>
      
      <List>
        <ListItem>
          <ListItemText primary="Username" secondary={username} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Roles" secondary={roles.join(', ')} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Status" secondary={status} />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Profile;