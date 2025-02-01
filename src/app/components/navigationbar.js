// components/Navbar.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import Link from 'next/link';

// Custom styling for the Navbar
const StyledAppBar = styled(AppBar)`
  background-color: #FF677D; /* Soft pink color */
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled(Box)`
  margin-left: auto;
  display: flex;
  gap: 20px;
`;

const NavButton = styled(Button)`
  color: white;
  text-transform: none;
  font-size: 16px;
  border-radius: 12px;
  padding: 10px 20px;
  &:hover {
    background-color: rgba(255, 103, 125, 0.3); /* Lighter pink on hover */
  }
`;

export default function Navbar() {
  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        {/* App name/logo */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Password Generator
        </Typography>
        
        {/* Navigation buttons */}
        <NavLinks>
          <Link href="/" passHref>
            <NavButton>Home</NavButton>
          </Link>
          <Link href="/about" passHref>
            <NavButton>About</NavButton>
          </Link>
          <Link href="/contact" passHref>
            <NavButton>Contact</NavButton>
          </Link>
        </NavLinks>
      </Toolbar>
    </StyledAppBar>
  );
}
