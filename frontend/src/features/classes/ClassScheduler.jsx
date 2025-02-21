import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@mui/material';
import { Schedule, FitnessCenter } from '@mui/icons-material';

const ClassScheduler = () => {
  const [formData, setFormData] = useState({
    className: '',
    trainer: '',
    time: '',
    duration: '60',
    capacity: 20
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <Schedule sx={{ mr: 2, fontSize: 40 }} />
        <Typography variant="h5">Schedule New Class</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Class Name"
              value={formData.className}
              onChange={(e) => setFormData({ ...formData, className: e.target.value })}
              required
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Trainer</InputLabel>
              <Select
                value={formData.trainer}
                onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                required
              >
                <MenuItem value="TR001">Trainer 1</MenuItem>
                <MenuItem value="TR002">Trainer 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Start Time"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Duration (minutes)</InputLabel>
              <Select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              >
                <MenuItem value={30}>30 minutes</MenuItem>
                <MenuItem value={60}>1 hour</MenuItem>
                <MenuItem value={90}>1.5 hours</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              startIcon={<FitnessCenter />}
              sx={{ mt: 2 }}
            >
              Schedule Class
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ClassScheduler;