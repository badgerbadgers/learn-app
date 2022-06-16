import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { ThemeContext } from "../components/theme/ThemeContextWrapper";
import { useSession, signOut } from "next-auth/react";
import {
  AppBar,
  Container,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Button,
  MenuItem,
  Menu,
  Tooltip,
  Avatar,
  Link,
} from "@mui/material/";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { mode, changeTheme } = useContext(ThemeContext);
  const { data: session, status } = useSession();
  const router = useRouter();

  const settings = [
    {
      href: status === "authenticated" ? `/portfolios/${session.user.gh}` : "/",
      target: "_blank",
      title: "Student profile",
    },

    {
      href:
        status === "authenticated"
          ? `https://github.com/${session.user.gh}`
          : "/",
      target: "_blank",
      title: "Github",
    },

    {
      href: "/dashboard",
      target: "_self",
      title: "Dashboard",
    },

    {
      href: "#",
      target: "_parent",
      title: "Logout",
    },

    {
      href: "#",
      name: "mode",
      title: mode === "dark" ? "Go to Light Mode" : "Go to Dark Mode",
    },
  ];

  // open the Menu when clicked on the avatar
  const handleMenuOpen = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // close the Menu when you select any Menu item
  const handleMenuClose = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      enableColorOnDark
      position="static"
      color="transparent"
      sx={{
        boxShadow: mode === "dark" ? "0 2px 4px -1px #C8C8CC" : "",
      }}
    >
      <Container maxWidth={false} sx={{ mx: 0 }}>
        <Toolbar disableGutters>
          {/* code for Logo */}
          <Avatar
            variant="square"
            alt="Code the Dream logo"
            src={
              mode === "dark"
                ? "../img/logo/CTD-Labs_Primary-Blue-BG[1].png"
                : "../img/logo/CTD-Labs_Primary[1].png"
            }
            sx={{
              mr: 3,
              display: "flex",
              width: "auto",
              cursor: "pointer",
            }}
            onClick={() => {
              session ? router.push("/dashboard") : router.push("/");
            }}
          />

          {/* Box for the user Image and Menu */}

          {session && (
            <Box
              sx={{
                flexGrow: 0,
                marginLeft: "auto",
                display: "flex",
                width: "auto",
                cursor: "pointer",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" mr={1}>
                {session.user.name || session.user.gh}
              </Typography>

              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ p: 0 }}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                >
                  <Avatar alt="User Image" src={session.user.image} />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                keepMounted
                open={Boolean(anchorElUser)}
                onClose={handleMenuClose}
              >
                {settings &&
                  settings.map((setting) => (
                    <MenuItem
                      key={setting.title}
                      onClick={() => {
                        handleMenuClose;
                        setting.title === "Logout" && signOut();
                        setting.name === "mode" && changeTheme(mode);
                      }}
                      component={Link}
                      href={setting.href}
                      target={setting.target}
                      rel="noopener noreferrer"
                    >
                      {setting.name === "mode" ? (
                        // Dark Mode switch
                        <Button
                          variant="contained"
                          color="secondary"
                          title={
                            mode === "dark"
                              ? "Go to Light Mode"
                              : "Go to Dark Mode"
                          }
                          sx={{
                            minWidth: "35px",
                            width: "20px",
                            borderRadius: "24px",
                          }}
                        >
                          {mode === "dark" ? (
                            <LightModeIcon />
                          ) : (
                            <DarkModeIcon />
                          )}
                        </Button>
                      ) : (
                        // For other Links
                        <Typography variant="body1" textAlign="center">
                          {setting.title}
                        </Typography>
                      )}
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
