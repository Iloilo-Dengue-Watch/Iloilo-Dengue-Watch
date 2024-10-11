import { Container, Typography, Paper , Grid2} from '@mui/material';
import WeatherCard from './WeatherCard';
import Forecast from './plots/Forecast';

function Data() {
  return (
      <Container className = "bg-gradient-to-r from-blue-100 to-blue-300">
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Dengue Data
          </Typography>
          <Grid2 container spacing={3}>
            <Grid2 item xs={12} sm={6}>
              <Paper elevation={2} style={{ padding: '10px' }}>
                <Typography variant="h6">Reported Cases</Typography>
                <Typography variant="body1">1,200</Typography>
              </Paper>
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <Paper elevation={2} style={{ padding: '10px' }}>
                <Typography variant="h6">Recovered</Typography>
                <Typography variant="body1">950</Typography>
              </Paper>
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <Paper elevation={2} style={{ padding: '10px' }}>
                <Typography variant="h6">Active Cases</Typography>
                <Typography variant="body1">200</Typography>
              </Paper>
            </Grid2>
            <Grid2 item xs={12} sm={6}>
              <Paper elevation={2} style={{ padding: '10px' }}>
                <Typography variant="h6">Deaths</Typography>
                <Typography variant="body1">50</Typography>
              </Paper>
            </Grid2>
          </Grid2>
        </Paper>

        <WeatherCard />
        <div className="container">
          <Forecast />
        </div>
      </Container>
  );
}

export default Data;
