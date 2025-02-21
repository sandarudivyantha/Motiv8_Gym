import { useState } from 'react';
import { useLoginMutation } from './authApiSlice';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, CssBaseline, Link } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

const Login = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login(credentials).unwrap();
      localStorage.setItem('token', accessToken);
      navigate('/dash');
    } catch (err) {
      setError(err.data?.message || 'Login failed');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LockOutlined sx={{ fontSize: 40, color: 'primary.main' }} />
        <Typography component="h1" variant="h5">Sign in</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            autoFocus
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Link href="#" variant="body2">Forgot password?</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;