import { Container, Grid, Typography, Button, Card, CardContent, Box } from '@mui/material';
import { motion } from 'framer-motion'; // Import the motion object
import React from 'react'; // Import React (if not already imported elsewhere)

const themeColors = {
  background: "#0F172A",
  primary: "#1E293B",
  accent: "#F59E0B",
  text: "#FFFFFF",
  secondaryText: "#94A3B8"
};

const DashoardPage = () => {
  return (
    <Container sx={{ py: 8 }}>
      {/* Featured Programs */}
      <Typography variant="h3" sx={{
        textAlign: 'center',
        mb: 6,
        fontWeight: 700,
        color: themeColors.accent
      }}>
        Transform Your Fitness Journey
      </Typography>

      <Grid container spacing={4} sx={{ mb: 8 }}>
        {['Personal Training', 'Group Classes', 'Nutrition Guidance'].map((program, index) => (
          <Grid item xs={12} md={4} key={index}>
            <motion.div // Use motion.div here
              whileHover={{ scale: 1.05 }}
              style={{ height: '100%' }} // Add inline style for height
            >
              <Card sx={{
                backgroundColor: themeColors.primary,
                borderRadius: '16px',
                display: 'flex',       // Use flexbox for vertical alignment
                flexDirection: 'column' // Align items vertically
              }}>
                <CardContent sx={{ p: 4, textAlign: 'center', flexGrow: 1 }}> {/* flexGrow to push content up */}
                  <Typography variant="h5" sx={{
                    mb: 2,
                    color: themeColors.accent,
                    fontWeight: 600
                  }}>
                    {program}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: themeColors.secondaryText,
                    lineHeight: 1.6
                  }}>
                    {index === 0 && 'Customized 1-on-1 training sessions with expert coaches'}
                    {index === 1 && 'Dynamic group workouts for all fitness levels'}
                    {index === 2 && 'Personalized meal plans and nutritional counseling'}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      mt: 3,
                      px: 4,
                      bgcolor: themeColors.accent,
                      '&:hover': { bgcolor: '#FCD34D' }
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Membership Section */}
      <Box sx={{
        backgroundColor: themeColors.primary,
        borderRadius: '16px',
        py: 6,
        px: 4,
        textAlign: 'center',
        mb: 8
      }}>
        <Typography variant="h4" sx={{
          mb: 3,
          fontWeight: 700,
          color: themeColors.accent
        }}>
          Start Your Transformation Today
        </Typography>
        <Typography variant="body1" sx={{
          color: themeColors.secondaryText,
          mb: 4,
          maxWidth: '800px',
          mx: 'auto'
        }}>
          Choose from our flexible membership plans and get access to premium facilities,
          expert trainers, and personalized workout programs.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 8,
            py: 2,
            fontSize: '1.1rem',
            bgcolor: themeColors.accent,
            '&:hover': { bgcolor: '#FCD34D' }
          }}
        >
          View Membership Plans
        </Button>
      </Box>
    </Container>
  );
};

export default DashoardPage;