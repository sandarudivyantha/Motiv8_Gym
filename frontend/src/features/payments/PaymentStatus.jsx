import { useGetPaymentsQuery } from './paymentsApiSlice';
import { Box, Typography, LinearProgress, Stack } from '@mui/material';
import { Paid, CheckCircle, Warning } from '@mui/icons-material';

const PaymentStatus = () => {
  const { data: payments } = useGetPaymentsQuery();

  const activePayments = payments?.filter(p => p.status === 'Active') || [];
  const expiredPayments = payments?.filter(p => p.status === 'Inactive') || [];

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Payment Overview
      </Typography>
      
      <Stack spacing={3}>
        <Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2">
              <Paid fontSize="small" sx={{ mr: 1 }} />
              Active Payments
            </Typography>
            <Typography>{activePayments.length}</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={(activePayments.length / (payments?.length || 1)) * 100}
            color="success"
          />
        </Box>

        <Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2">
              <Warning fontSize="small" sx={{ mr: 1 }} />
              Expired Payments
            </Typography>
            <Typography>{expiredPayments.length}</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={(expiredPayments.length / (payments?.length || 1)) * 100}
            color="warning"
          />
        </Box>

        <Box textAlign="center">
          <CheckCircle color="success" sx={{ fontSize: 40 }} />
          <Typography variant="body2" mt={1}>
            Total Collected: ₹{payments?.reduce((sum, p) => sum + p.amount, 0) || 0}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default PaymentStatus;