import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';

const Public = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Motiv8 Gym
      </Typography>
      <Typography variant="body1" paragraph>
        Achieve your fitness goals with our state-of-the-art facilities and expert trainers.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          component={Link}
          to="/login"
          sx={{ mr: 2 }}
        >
          Employee Login
        </Button>
        <Button
          variant="outlined"
          component={Link}
          to="/dash"
        >
          Member Portal
        </Button>
      </Box>
    </Container>
  );
};

export default Public;