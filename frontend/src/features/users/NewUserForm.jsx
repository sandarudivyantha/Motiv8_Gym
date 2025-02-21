import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddNewUserMutation } from './usersApiSlice'; // Custom API slice hook for adding a new user
import { Button, TextField, Grid, MenuItem, FormControl, InputLabel, Select, Checkbox, FormControlLabel } from '@mui/material';

// Define the NewUserForm component
const NewUserForm = () => {
  // Hook for making an API call to add a new user
  const [addNewUser, { isLoading }] = useAddNewUserMutation();
  const navigate = useNavigate(); // Hook for programmatic navigation

  // State to manage form input values
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    password: '',
    roles: ['Member'], // Default role is 'Member'
    active: true       // Default user status is active
  });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      await addNewUser(formState).unwrap(); // Call API to add new user and unwrap the response
      navigate('/dash/users'); // Navigate to users dashboard after successful creation
    } catch (err) {
      console.error('Failed to save user:', err); // Log error if request fails
    }
  };

  // Function to handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value })); // Update corresponding field in state
  };

  return (
    // Form layout using Material-UI Grid
    <Grid container component="form" onSubmit={handleSubmit} spacing={3}>
      {/* First Name Input Field */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
          required
        />
      </Grid>
      {/* Last Name Input Field */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange}
          required
        />
      </Grid>
      {/* Email Input Field */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
        />
      </Grid>
      {/* Phone Number Input Field */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Phone Number"
          name="phoneNo"
          value={formState.phoneNo}
          onChange={handleChange}
          inputProps={{ pattern: "\\d{10}" }} // Ensure phone number is 10 digits
          required
        />
      </Grid>
      {/* Password Input Field */}
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          required
        />
      </Grid>
      {/* Roles Dropdown Menu */}
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel>Roles</InputLabel>
          <Select
            multiple
            name="roles"
            value={formState.roles}
            onChange={handleChange}
            required
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Trainer">Trainer</MenuItem>
            <MenuItem value="Member">Member</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {/* Active Status Checkbox */}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formState.active}
              onChange={(e) => setFormState(prev => ({ ...prev, active: e.target.checked }))}
              name="active"
            />
          }
          label="Active"
        />
      </Grid>
      {/* Submit Button */}
      <Grid item xs={12}>
        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Create User'} {/* Show loading text if API call is in progress */}
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewUserForm;
