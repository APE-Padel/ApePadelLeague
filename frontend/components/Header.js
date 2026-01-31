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
import { featureFlags } from "@/lib/featureFlags";

const pages = [
  { displayName: "Inici", path: "/", enabled: true },
  { displayName: "Calendari", path: "/calendar", enabled: featureFlags.calendar },
  { displayName: "Equips", path: "/teams", enabled: featureFlags.teams },
  { displayName: "Admin", path: "/admin", enabled: featureFlags.admin },
];

const visiblePages = pages.filter(page => page.enabled);

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleOpenNavMenu = () => {
    setMobileOpen(true);
  };

  const handleCloseNavMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            {/* Desktop Logo */}
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Box sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
                <Image src="/logo.png" alt="Logo" width={60} height={60} priority />
              </Box>
            </Link>

            {/* Desktop Menu */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {visiblePages.map((page) => (
                <Link
                  key={page.displayName}
                  href={page.path}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    sx={{
                      my: 2,
                      mx: 2,
                      color: "white",
                      fontSize: "18px",
                    }}
                  >
                    {page.displayName}
                  </Button>
                </Link>
              ))}
            </Box>

            {/* Mobile Logo */}
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                flexGrow: 1,
              }}
            >
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <Image src="/logo.png" alt="Logo" width={40} height={40} priority />
              </Box>
            </Link>

            {/* Mobile Hamburger */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open navigation menu"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Fullscreen Menu */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            top: { xs: 56, sm: 64 }, // AppBar height
            height: {
              xs: "calc(100vh - 56px)",
              sm: "calc(100vh - 64px)",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 3,
            gap: 2,
          }}
        >
          {visiblePages.map((page) => (
            <Link
              key={page.displayName}
              href={page.path}
              onClick={handleCloseNavMenu}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h6"
                sx={{
                  py: 1,
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                }}
              >
                {page.displayName}
              </Typography>
            </Link>
          ))}
        </Box>
      </Drawer>
    </>
  );
}
