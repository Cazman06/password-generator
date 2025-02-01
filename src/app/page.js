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
import Switch from '@mui/material/Switch';

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
      border-color: #FF677D;
    }
  }
  
  .MuiInputLabel-root {
    color: #3f51b5;
  }

  .MuiInputBase-root {
    color: #333;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #ddd;
  }
  
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: #FF677D;
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

const StyledSwitch = styled(Switch)`

&.MuiSwitch-root {
    width: 60px;
    height: 34px;
    padding: 7px;
    border-radius: 34px;
    background-color: #eee;
    transition: background-color 0.3s ease;
  }
  & {
    .MuiSwitch-switchBase {
      color: #FF677D;
      &:hover {
        background-color: rgba(255, 103, 125, 0.08);
      }
    }

    .MuiSwitch-track {
      background-color: #ddd;
    }

    .MuiSwitch-thumb {
      background-color: #FF677D;
    }

    .Mui-checked {
      color: #3f51b5;
    }

    .Mui-checked + .MuiSwitch-track {
      background-color: #3f51b5;
    }
  }
`;

const StyledLabel = styled(Typography)`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
  margin-top: 5px;
`;

const StyledSwitchContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const CHARACTERS = '!@#$%^&*()_+[]{}|;:,.<>?'
const NUMBERS = '0123456789'

const generatePassword = (length, includeCharacters, includeNumbers) => {
  const array = new Uint32Array(length);
  const randomValues = window.crypto.getRandomValues(array);

  const charSet = [
    LETTERS,
    includeCharacters ? CHARACTERS : '',
    includeNumbers ? NUMBERS : ''
  ].join('')

  return Array.from(randomValues).map(val => charSet.charAt(val % charSet.length)).join('')
};

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(20);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);


  const handleGenerateClick = () => {
    const newPassword = generatePassword(length, includeCharacters, includeNumbers);
    setPassword(newPassword);
  };

  const handleCharacterChange = (event) => {
    setIncludeCharacters(event.target.checked)
  }

  const handleNumberChange = (event) => {
    setIncludeNumbers(event.target.checked)
  }
  
  const handleCopyToClipboardClick = async (text) => {
    await navigator.clipboard.writeText(text);
  }
  
  const handleSliderChange = (event, newValue) => {
    setLength(newValue)
  }

  return (
    <StyledContainer>
      <StyledPaper>
        <StyledSlider
          defaultValue={20}
          value={length}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
        />

        <StyledSwitchContainer>

        <StyledLabel> Characters </StyledLabel>

        <StyledSwitch
          checked={includeCharacters}
          onChange={(e) => handleCharacterChange(e)}
          inputProps={{ 'aria-label': 'controlled' }}
        />

        <StyledLabel> Numbers </StyledLabel>

        <StyledSwitch
          checked={includeNumbers}
          onChange={(e) => handleNumberChange(e)}
          inputProps={{ 'aria-label': 'controlled' }}
        />

        </StyledSwitchContainer>

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