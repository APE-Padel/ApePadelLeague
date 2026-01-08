"use client";

import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';

const pages = [
  { displayName: 'Inici', path: '/' },
  { displayName: 'Calendari', path: '/calendar' },
  { displayName: 'Equips', path: '/teams' },
  { displayName: 'Admin', path: '/admin' }
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Desktop Logo */}
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
						<Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
							<Image
								src="/logo.png"
								alt="Logo"
								width={60}
								height={60}
								priority
							/>
						</Box>
          </Link>

          {/* Desktop Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.displayName} href={page.path} style={{ textDecoration: 'none' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, mx: 2, color: 'white', display: 'block', fontSize: '18px' }}
                >
                  {page.displayName}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Mobile Logo */}
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1  }}>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
							<Image
								src="/logo.png"
								alt="Logo"
								width={40}
								height={40}
								priority
							/>
						</Box>
          </Link>

          {/* Mobile Hamburger Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.displayName} onClick={handleCloseNavMenu}>
                  <Link href={page.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <Typography sx={{ textAlign: 'center' }}>{page.displayName}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
