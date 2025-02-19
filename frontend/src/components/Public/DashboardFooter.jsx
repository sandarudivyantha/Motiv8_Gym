import { Box, Typography, Grid, Link } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt,
  faInstagram,
  faFacebook
} from "@fortawesome/free-solid-svg-icons";
import { Container } from '@mui/material'; 

const themeColors = {
  background: "#0F172A",
  primary: "#1E293B",
  accent: "#F59E0B",
  text: "#FFFFFF",
  secondaryText: "#94A3B8"
};

const DashboardFooter = () => {
  return (
    <Box sx={{ 
      backgroundColor: themeColors.primary,
      py: 6,
      mt: 8,
      borderTop: `2px solid ${themeColors.accent}`
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: themeColors.accent, mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: 8 }} />
              <Typography variant="body2" sx={{ color: themeColors.secondaryText }}>
                123 Fitness Street, Gym City
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: 8 }} />
              <Typography variant="body2" sx={{ color: themeColors.secondaryText }}>
                info@motiv8gym.com
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faPhone} style={{ marginRight: 8 }} />
              <Typography variant="body2" sx={{ color: themeColors.secondaryText }}>
                (555) 123-4567
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: themeColors.accent, mb: 2 }}>
              Quick Links
            </Typography>
            <Link href="/programs" sx={{ display: 'block', color: themeColors.secondaryText, mb: 1 }}>
              Training Programs
            </Link>
            <Link href="/membership" sx={{ display: 'block', color: themeColors.secondaryText, mb: 1 }}>
              Membership Plans
            </Link>
            <Link href="/about" sx={{ display: 'block', color: themeColors.secondaryText }}>
              About Us
            </Link>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: themeColors.accent, mb: 2 }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <FontAwesomeIcon 
                icon={faInstagram} 
                style={{ color: themeColors.secondaryText, fontSize: 24 }} 
              />
              <FontAwesomeIcon 
                icon={faFacebook} 
                style={{ color: themeColors.secondaryText, fontSize: 24 }} 
              />
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: `1px solid ${themeColors.secondaryText}` }}>
          <Typography variant="body2" sx={{ color: themeColors.secondaryText }}>
            © 2024 Motiv8 Gym. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardFooter;