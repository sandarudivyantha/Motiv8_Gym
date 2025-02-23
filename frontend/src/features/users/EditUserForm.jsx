import { useState } from 'react';
import { useUpdateUserMutation } from './usersApiSlice';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [formState, setFormState] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNo: user.phoneNo,
    roles: user.roles,
    active: user.active
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ id: user._id, ...formState }).unwrap();
    } catch (err) {
      console.error('Failed to update user:', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Edit User</Typography>
      
      <TextField
        fullWidth
        label="First Name"
        value={formState.firstName}
        onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
        margin="normal"
        required
      />
      
      <TextField
        fullWidth
        label="Last Name"
        value={formState.lastName}
        onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={formState.email}
        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Phone Number"
        value={formState.phoneNo}
        onChange={(e) => setFormState({ ...formState, phoneNo: e.target.value })}
        margin="normal"
        inputProps={{ pattern: "\\d{10}" }}
        required
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Roles</InputLabel>
        <Select
          multiple
          value={formState.roles}
          onChange={(e) => setFormState({ ...formState, roles: e.target.value })}
          required
        >
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Trainer">Trainer</MenuItem>
          <MenuItem value="Member">Member</MenuItem>
        </Select>
      </FormControl>

      <Button 
        type="submit" 
        variant="contained" 
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? 'Updating...' : 'Update User'}
      </Button>
    </Box>
  );
};

export default EditUserForm;