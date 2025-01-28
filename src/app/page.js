'use client'

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material';

const StyledContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: #A8E6CF;
  padding: 20px;
`;

const StyledPaper = styled(Paper)`
  padding: 30px 40px;
  text-align: center;
  width: 100%;
  max-width: 500px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  background-color: #ffffff;
  @media (max-width: 600px) {
    max-width: 100%;
    padding: 20px 30px;
  }
`;

const StyledTextField = styled(TextField)`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  
  .MuiOutlinedInput-root {
    border-radius: 8px;
    &.Mui-focused {
      border-color: #FF677D; /* Matching border color for focus state */
    }
  }
  
  .MuiInputLabel-root {
    color: #3f51b5; /* Color for the label */
  }

  .MuiInputBase-root {
    color: #333; /* Text color inside the input field */
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #ddd; /* Lighter border by default */
  }
  
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: #FF677D; /* Border color change on hover */
  }
`;

const StyledSlider = styled(Slider)`
  margin-top: 10px;
  margin-bottom: 30px;
  width: 100%;
  .MuiSlider-rail {
    background-color: #ddd;
  }
  .MuiSlider-thumb {
    background-color: #3f51b5;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  padding: 12px;
  margin-top: 12px;
  text-transform: none;
  &.create-button {
    background-color: #FF677D;
  }
  &.create-button:hover {
    background-color: #FF677D;
  }
  &.copy-button {
    background-color: #D4A5A5;
  }
  &.copy-button:hover {
    background-color: #D4A5A5;
  }
`;

const generatePassword = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  return array.map(val => charset[val % charset.length]).join('');
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(20);

  const handleGenerateClick = () => {
    const newPassword = generatePassword(length);
    setPassword(newPassword);
  };
  
  const handleCopyToClipboardClick = async (text) => {
    await navigator.clipboard.writeText(text);
  }
  
  const handleSliderChange = (event, newValue) => {
    setLength(newValue)
  }

  return (
    <StyledContainer>
      <StyledPaper>
        <Typography variant="h4" gutterBottom>Password Generator</Typography>

        <StyledSlider
          defaultValue={20}
          value={length}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
        />

        <StyledTextField
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
            <StyledButton 
              variant="contained" 
              color="primary"
              className='create-button'
              onClick={handleGenerateClick}>
              <b> Create Password </b>
            </StyledButton>

            <StyledButton
              variant='contained'
              color='primary'
              className='copy-button'
              onClick={() => handleCopyToClipboardClick(password)}>
              <b> Copy Password </b>
            </StyledButton>
          </Grid>
        </Grid>
      </StyledPaper>
    </StyledContainer>
  );
};

export default PasswordGenerator;