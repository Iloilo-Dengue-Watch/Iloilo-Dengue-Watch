import React from 'react';
import { Container, Typography, Grid2, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dengue Situation Overview
      </Typography>
      <Grid2 container spacing={3}>
        {/* Panel for Statistics */}
        <Grid2 item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Statistics</Typography>
            <Typography variant="body2">
              Get the latest data on dengue cases, recoveries, and deaths.
            </Typography>
            <Button component={Link} to="/data" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              View Statistics
            </Button>
          </Paper>
        </Grid2>

        {/* Panel for Map */}
        <Grid2 item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Affected Areas Map</Typography>
            <Typography variant="body2">
              Explore the map showing the most affected areas with dengue outbreaks.
            </Typography>
            <Button component={Link} to="/map" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              View Map
            </Button>
          </Paper>
        </Grid2>

        {/* Panel for News */}
        <Grid2 item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Dengue News</Typography>
            <Typography variant="body2">
              Stay updated with the latest news regarding dengue outbreaks and prevention measures.
            </Typography>
            <Button component={Link} to="/news" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              View News
            </Button>
          </Paper>
        </Grid2>

        {/* Panel for General Information */}
        <Grid2 item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">General Information</Typography>
            <Typography variant="body2">
              Learn how to protect yourself and your family from dengue and stay informed.
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Learn More
            </Button>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default Home;
