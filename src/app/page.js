'use client'

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

// Utility function to generate a random password using the built-in crypto API
const generatePassword = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array); // Generate random values
  return array.map(val => charset[val % charset.length]).join(''); // Map to charset
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);

  // Handle password generation
  const handleGenerateClick = () => {
    const newPassword = generatePassword(length);
    setPassword(newPassword);
  };

  const handleCopyToClipboardClick = async (text) => {
    await navigator.clipboard.writeText(text);
  }

  return (
    <Box style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      flexDirection: 'column' 
    }}>
      <Paper style={{ 
        padding: 3, 
        textAlign: 'center', 
        width: '100%', 
        maxWidth: 400 
      }}>
        <Typography variant="h4" gutterBottom>Password Generator</Typography>
        <Typography variant="body1" gutterBottom>Length: {length}</Typography>

        <Slider
          value={length}
          onChange={(e, newValue) => setLength(newValue)}
          min={8}
          max={20}
          step={1}
          valueLabelDisplay="auto"
        />

        <TextField
          label="Generated Password"
          value={password}
          fullWidth
          variant="outlined"
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />

        <Grid container spacing={2} justifyContent="center">
          <Grid>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleGenerateClick}>
              Create Password
            </Button>

            <Button
              variant='contained'
              color='primary'
              onClick={() => handleCopyToClipboardClick(text)}>
              Copy Password
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PasswordGenerator;