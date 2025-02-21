import { useState } from 'react';
import { useCreatePaymentMutation } from './paymentsApiSlice';
import { Button, TextField, Grid, MenuItem, FormControl, InputLabel, Select, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// NewPaymentForm Component
const NewPaymentForm = () => {
  // Hook to call API for creating a new payment
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  
  // State for payment type selection
  const [paymentType, setPaymentType] = useState('Admission');
  
  // State to store form values
  const [formState, setFormState] = useState({
    username: '',       // Stores the username
    amount: '',         // Stores the payment amount
    paymentType: 'Admission', // Default payment type
    validFrom: null,    // Stores the start date (for Monthly Fee only)
    validTo: null       // Stores the end date (for Monthly Fee only)
  });

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await createPayment(formState).unwrap(); // Call API to create payment
      // Handle success (e.g., show a success message or redirect)
    } catch (err) {
      console.error('Payment failed:', err); // Log error in case of failure
    }
  };

  return (
    // Form layout using Material-UI Grid
    <Grid container component="form" onSubmit={handleSubmit} spacing={3}>
      {/* Title for the form */}
      <Grid item xs={12}>
        <Typography variant="h6">New Payment</Typography>
      </Grid>
      
      {/* Username Input Field */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={formState.username}
          onChange={(e) => setFormState(prev => ({ ...prev, username: e.target.value }))}
          required
        />
      </Grid>
      
      {/* Payment Type Dropdown */}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Payment Type</InputLabel>
          <Select
            value={paymentType}
            onChange={(e) => {
              setPaymentType(e.target.value);
              setFormState(prev => ({ ...prev, paymentType: e.target.value }));
            }}
            required
          >
            <MenuItem value="Admission">Admission Fee</MenuItem>
            <MenuItem value="Monthly">Monthly Fee</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Amount Input Field */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Amount"
          type="number"
          name="amount"
          value={formState.amount}
          onChange={(e) => setFormState(prev => ({ ...prev, amount: e.target.value }))}
          required
        />
      </Grid>

      {/* Show date pickers only if payment type is Monthly */}
      {paymentType === 'Monthly' && (
        <>
          {/* Valid From Date Picker */}
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Valid From"
              value={formState.validFrom}
              onChange={(date) => setFormState(prev => ({ ...prev, validFrom: date }))}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          {/* Valid To Date Picker */}
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Valid To"
              value={formState.validTo}
              onChange={(date) => setFormState(prev => ({ ...prev, validTo: date }))}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
        </>
      )}

      {/* Submit Button */}
      <Grid item xs={12}>
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Create Payment'} {/* Show loading state if API call is in progress */}
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewPaymentForm;
