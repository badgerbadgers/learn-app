import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ThemeContextWrapper from "../components/theme/ThemeContextWrapper";
import { ThemeContext, themes } from "../components/theme/themeContext";
import Link from "next/link";
import { useSession } from "next-auth/react";
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

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const { data: session, status } = useSession();
  const user = null;

  if (status === "authenticated") {
    user = { ...(session.user.name || session.user.gh) };
  }

  const settings = [
    {
      href: "{`/portfolios/${encodeURIComponent(user)}`}",
      title: "Portfolio",
    },
    {
      href: "/",
      title: "Github",
    },
    {
      href: "/",
      title: "Logout",
    },
  ];

  //change to more normal JS
  const open = !anchorElUser;

  // open the Menu when hover over the avatar
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // close the Menu when you select any Menu item
  const handleMenuClose = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "transparent" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* code for Logo */}
          <Avatar
            variant="square"
            alt="Code the Dream logo"
            src="../img/CTD-Labs_Primary[1].png"
            noWrap
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            onClick={() => {
              router.push({ pathname: "/" });
            }}
          >
            CD
          </Avatar>
          {/* Dark Mode switch */}
          <Switch
            checked={darkMode}
            onClick={() => {
              setDarkMode(!darkMode);
              changeTheme(darkMode ? themes.light : themes.dark);
            }}
          />
          <Typography variant="8" alignSelf="center">
            {darkMode ? "Dark Mode" : "Light Mode"}
          </Typography>

          {/* Box for the user Image and Menu */}
          {session && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
                  <Avatar alt="User Image" src={session.user.image} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
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
                open={open}
                onClose={handleMenuClose}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={handleMenuClose}>
                    <Link href={setting.href} passHref>
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </Link>
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

{
  /* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton> */
}
{
  /* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {session && (
              <div>
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/" passHref>
                    Home
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href={`/portfolios/${encodeURIComponent(session.user.gh)}`}
                  >
                    Portfolio
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href={`/userform/${encodeURIComponent(session.user.gh)}`}
                  >
                    Edit Portfolio
                  </Link>
                </MenuItem>
              </div>
            )}
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Code the Dream
          </Typography> */
}
