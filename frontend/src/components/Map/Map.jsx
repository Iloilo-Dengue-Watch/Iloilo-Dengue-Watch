import React from 'react';
import { Container, Typography, Paper } from '@mui/material';

function Map() {
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Affected Areas Map
        </Typography>
        <Typography variant="body1">
          The following map highlights areas with a high number of dengue cases. Please be cautious if you are in or near these regions.
        </Typography>
        <Paper elevation={1} style={{ marginTop: '20px', height: '400px' }}>
          {/* Placeholder for a map component */}
          <Typography variant="body1" align="center" style={{ lineHeight: '400px' }}>
            Map Placeholder
          </Typography>
        </Paper>
      </Paper>
    </Container>
  );
}

export default Map;
