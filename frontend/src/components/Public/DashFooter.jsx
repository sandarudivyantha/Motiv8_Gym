import { Box, Typography } from '@mui/material';

const DashFooter = () => {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'primary.main' }}>
      <Typography variant="body2" color="white" align="center">
        © {new Date().getFullYear()} Motiv8 Gym Management System. All rights reserved.
      </Typography>
    </Box>
  );
};

export default DashFooter;