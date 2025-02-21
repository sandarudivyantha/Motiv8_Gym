import { useGetUsersQuery } from './usersApiSlice';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Chip } from '@mui/material';
import { Link } from 'react-router-dom';

const UsersList = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  const columns = [
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phoneNo', headerName: 'Phone', width: 130 },
    { 
      field: 'roles', 
      headerName: 'Roles', 
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          {params.value.map(role => (
            <Chip key={role} label={role} color="primary" size="small" />
          ))}
        </Box>
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Link to={`/dash/users/${params.row.id}`} style={{ textDecoration: 'none' }}>
          <Button size="small">Edit</Button>
        </Link>
      )
    }
  ];

  return (
    <Box sx={{ height: 600, width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <DataGrid
        rows={users || []}
        columns={columns}
        loading={isLoading}
        getRowId={(row) => row._id}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default UsersList;