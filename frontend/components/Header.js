"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from "@mui/icons-material/Person";
import { featureFlags } from "@/lib/featureFlags";

const pages = [
  { displayName: "Inici", path: "/", enabled: true },
  { displayName: "Calendari", path: "/calendar", enabled: featureFlags.calendar },
  { displayName: "Equips", path: "/teams", enabled: featureFlags.teams },
  { displayName: "Classificació", path: "/standings", enabled: featureFlags.standings },
  { displayName: "Login", path: "/auth/login", enabled: featureFlags.login },
  { displayName: "Admin", path: "/admin", enabled: featureFlags.admin },
  { displayName: "Resultats", path: "/matches/results", enabled: featureFlags.editResults }
];

const visiblePages = pages.filter(page => page.enabled);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState(null);
  const [mobileAccountMenuOpen, setMobileAccountMenuOpen] = React.useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    setAccountMenuAnchor(null);
    window.location.href = "/";
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            {/* Desktop Logo */}
            <Link href="/" sx={homeLinkStyle}>
              <Box sx={{ ...hideOnMobile, mr: 2 }}>
                <Image src="/logo.png" alt="Logo" width={60} height={60} priority />
              </Box>
            </Link>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, ...hideOnMobile }}>
              {visiblePages.map((page) => (
                <Link
                  key={page.displayName}
                  href={page.path}
                  sx={{ textDecoration: "none" }}
                >
                  <Button sx={headerLinkStyle}> {page.displayName} </Button>
                </Link>
              ))}
            </Box>

            {/* Desktop Account Menu */}
            {user && (
              <Box sx={hideOnMobile}>
                <Tooltip title="Compte">
                  <IconButton onClick={(e) => setAccountMenuAnchor(e.currentTarget)}>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={accountMenuAnchor}
                  open={Boolean(accountMenuAnchor)}
                  onClose={() => setAccountMenuAnchor(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem disabled>{user.username.toUpperCase()}</MenuItem>
                  <MenuItem onClick={handleLogout}>Tancar sessió</MenuItem>
                </Menu>
              </Box>
            )}

            {/* Mobile Logo */}
            <Link href="/" sx={homeLinkStyle}>
              <Box sx={hideOnDesktop}>
                <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
              </Box>
            </Link>

            {/* Mobile Hamburger */}
            <Box sx={{ ...hideOnDesktop, ml: "auto" }}>
              <IconButton
                size="large"
                onClick={() => setMobileMenuOpen(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Mobile Account Menu */}
            {user && (
              <Box sx={{ ...hideOnDesktop, ml: 1 }}>
                <IconButton
                  onClick={() => setMobileAccountMenuOpen(true)}
                >
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </IconButton>
              </Box>
            )}

          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Fullscreen Menu */}
      <Drawer
        anchor="top"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={mobileMenuStyle}
      >
        <Box sx={mobileMenuContainerStyle} >
          {visiblePages.map((page) => (
            <Link
              key={page.displayName}
              href={page.path}
              onClick={() => setMobileMenuOpen(false)}
              style={mobileMenuLinkStyle}
            >
              <Typography variant="h6" style={mobileMenuLinkTextStyle}>
                {page.displayName}
              </Typography>
            </Link>
          ))}
        </Box>
      </Drawer>

      {/* Mobile Account Menu */}
      <Drawer
        anchor="top"
        open={mobileAccountMenuOpen}
        onClose={() => setMobileAccountMenuOpen(false)}
        sx={mobileMenuStyle}
      >
        <Box sx={mobileMenuContainerStyle}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {user?.username.toUpperCase()}
          </Typography>
          <Box onClick={handleLogout} sx={{ ...mobileMenuLinkTextStyle, cursor: "pointer" }}>
            <Typography variant="h6">Tancar sessió</Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

/* Styles */

const hideOnMobile = {
  display: { xs: "none", md: "flex" }
}

const hideOnDesktop = {
  display: { xs: "flex", md: "none" }
}

const headerLinkStyle = {
  my: 2,
  mx: 2,
  color: "white",
  fontSize: "18px",
};

const homeLinkStyle = {
  textDecoration: "none",
  color: "inherit",
  flexGrow: 1,
};

const mobileMenuStyle = {
  ...hideOnDesktop,
  "& .MuiDrawer-paper": {
    top: { xs: 56, sm: 64 }, // AppBar height
    height: {
      xs: "calc(100vh - 56px)",
      sm: "calc(100vh - 64px)",
    },
  },
};

const mobileMenuContainerStyle = {
  display: "flex",
  flexDirection: "column",
  p: 3,
  gap: 2,
};

const mobileMenuLinkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const mobileMenuLinkTextStyle = {
  py: 1,
  borderBottom: "1px solid rgba(0,0,0,0.1)",
};