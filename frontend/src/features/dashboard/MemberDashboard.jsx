import { useAuth } from '../../hooks/useAuth';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import PaymentStatus from '../payments/PaymentStatus';
import { FitnessCenter, Paid, CalendarToday } from '@mui/icons-material';

const MemberDashboard = () => {
  const { username } = useAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Welcome Back, {username}!
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <FitnessCenter sx={{ mr: 2, fontSize: 40 }} />
                <Typography variant="h5">Workout Schedule</Typography>
              </Box>
              {/* Add workout schedule component */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <PaymentStatus />
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Paid sx={{ mr: 2, fontSize: 40 }} />
                <Typography variant="h5">Payment History</Typography>
              </Box>
              {/* Add payment history component */}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <CalendarToday sx={{ mr: 2, fontSize: 40 }} />
                <Typography variant="h5">Upcoming Sessions</Typography>
              </Box>
              {/* Add calendar component */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MemberDashboard;