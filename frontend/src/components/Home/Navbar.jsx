import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar >
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          AI4GHI Challenge
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/data">Data</Button>
        <Button color="inherit" component={Link} to="/map">Map</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
