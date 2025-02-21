import { useState } from 'react';
import { Button, Typography, Paper, Grid, Avatar } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';

const AttendanceTracker = () => {
  const [attendance, setAttendance] = useState({});

  const members = [
    { id: 'MB001', name: 'John Doe' },
    { id: 'MB002', name: 'Jane Smith' },
    // ... more members
  ];

  const toggleAttendance = (memberId) => {
    setAttendance(prev => ({
      ...prev,
      [memberId]: !prev[memberId]
    }));
  };

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Today's Attendance
      </Typography>
      
      <Grid container spacing={2}>
        {members.map(member => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ mr: 2 }}>{member.name[0]}</Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography>{member.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.id}
                </Typography>
              </Box>
              <Button 
                color={attendance[member.id] ? 'success' : 'default'}
                onClick={() => toggleAttendance(member.id)}
              >
                {attendance[member.id] ? <CheckCircle /> : <RadioButtonUnchecked />}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default AttendanceTracker;