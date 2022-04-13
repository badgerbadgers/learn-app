import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeContext } from "../components/theme/ThemeContextWrapper";
import { useSession, signOut } from "next-auth/react";
import {
  AppBar,
  Container,
  Switch,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Tooltip,
  Avatar,
} from "@mui/material/";
import { DarkMode } from "@mui/icons-material";

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { mode, changeTheme } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(false);
  const { data: session, status } = useSession();

  console.log(mode, "****mode from context");
  console.log("DarkMode status*****" + darkMode);

  const router = useRouter();

  const settings = [
    {
      href:
        status === "authenticated"
          ? `/portfolios/${encodeURIComponent(session.user.gh)}`
          : "/",
      target: "_blank",
      title: "Portfolio",
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
      onClick: () => {
        signOut({ callbackUrl: "/" });
      },
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
    <div>
      <AppBar
        enableColorOnDark
        position="static"
        color="transparent"
        sx={{
          boxShadow: darkMode ? "0 2px 4px -1px #f1f1f2" : "",
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
                  ? "../img/CTD-Labs_Primary-Blue-BG[1].png"
                  : "../img/CTD-Labs_Primary[1].png"
              }
              sx={{
                mr: 3,
                display: "flex",
                width: "auto",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push("/");
              }}
            >
              CD
            </Avatar>
            {/* Dark Mode switch */}

            <Switch
              checked={darkMode}
              inputProps={{ "aria-label": "controlled" }}
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(mode);
              }}
            />
            <Typography
              variant="body1"
              alignSelf="center"
              sx={{ color: mode === 'dark' ? "#fff" : "#000" }}
            >
              {mode === "dark" ? "Light Mode" : "Dark Mode"}
            </Typography>

            {/* Box for the user Image and Menu */}

            {session && (
              <Box sx={{ flexGrow: 0, marginLeft: "auto", display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="body1"
                  mr={1}
                  sx={{ color: mode === "dark" ? "#fff" : "#000" }}
                >
                  {session.user.name || session.user.gh}
                </Typography>

                <Tooltip title="Open settings">
                  <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                    <Avatar alt="User Image" src={session.user.image} />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{
                    mt: "45px",
                    top: { xs: "-9px" },
                    left: { xs: "10px" },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleMenuClose}
                >
                  {settings &&
                    settings.map((setting) => (
                      <MenuItem key={setting.title} onClick={handleMenuClose}>
                        <a
                          href={setting.href}
                          target={setting.target}
                          rel="noopener noreferrer"
                          onClick={setting.onClick}
                        >
                          <Typography textAlign="center">
                            {setting.title}
                          </Typography>
                        </a>
                      </MenuItem>
                    ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default NavBar;
