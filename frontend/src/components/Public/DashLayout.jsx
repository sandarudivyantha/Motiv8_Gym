import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import DashHeader from './DashHeader';
import DashFooter from './DashFooter';

const DashLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <DashHeader />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
      <DashFooter />
    </Box>
  );
};

export default DashLayout;