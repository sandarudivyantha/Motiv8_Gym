import { Typography, Box } from '@mui/material';
import useAuth from '../../hooks/useAuth';

const Welcome = () => {
  const { username, isAdmin, isTrainer } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome {username}!
      </Typography>
      <Typography variant="body1">
        {isAdmin && "You have Administrator privileges"}
        {isTrainer && "You have Trainer privileges"}
        {!isAdmin && !isTrainer && "Member Dashboard"}
      </Typography>
    </Box>
  );
};

export default Welcome;