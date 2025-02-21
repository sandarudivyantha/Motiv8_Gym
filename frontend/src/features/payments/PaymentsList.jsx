import { useGetPaymentsQuery } from './paymentsApiSlice';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const PaymentsList = () => {
  const { data: payments, isLoading } = useGetPaymentsQuery();

  const columns = [
    { field: 'billCode', headerName: 'Bill Code', width: 150 },
    { field: 'username', headerName: 'Member', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 100 },
    { 
      field: 'paymentType', 
      headerName: 'Type', 
      width: 120,
      renderCell: (params) => (
        <Chip 
          label={params.value} 
          color={params.value === 'Admission' ? 'primary' : 'secondary'} 
          size="small" 
        />
      )
    },
    { 
      field: 'paymentDate', 
      headerName: 'Date', 
      width: 150,
      valueFormatter: (params) => format(new Date(params.value), 'dd MMM yyyy')
    },
    { 
      field: 'validFrom', 
      headerName: 'Valid From', 
      width: 150,
      valueFormatter: (params) => params.value ? format(new Date(params.value), 'dd MMM yyyy') : '-'
    },
    { 
      field: 'validTo', 
      headerName: 'Valid To', 
      width: 150,
      valueFormatter: (params) => params.value ? format(new Date(params.value), 'dd MMM yyyy') : '-'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Link to={`/dash/payments/${params.row._id}`} style={{ textDecoration: 'none' }}>
          <Button size="small">View</Button>
        </Link>
      )
    }
  ];

  return (
    <Box sx={{ height: 600, width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>Payment Records</Typography>
      <DataGrid
        rows={payments || []}
        columns={columns}
        loading={isLoading}
        getRowId={(row) => row._id}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default PaymentsList;