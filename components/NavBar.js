import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeContext, themes } from "../components/theme/themeContext";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
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
  const [darkMode, setDarkMode] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  const user = null;

  if (status === "authenticated") {
    user = { ...(session.user.name || session.user.gh) };
  }

  console.log(session);
  const settings = [
    {
      href:  status === "authenticated"
      ? `/portfolios/${encodeURIComponent(session.user.gh)}`
      : "/",
      target: "_self",
      title: "Portfolio",
    },

    {
      href: status === "authenticated"
      ?`https://github.com/${session.user.gh}` : "",
      target: "_blank",
      title: "Github",
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
    <ThemeContext.Consumer>
      {({ changeTheme }) => (
        <div>
          <AppBar
            enableColorOnDark
            position="static"
            sx={{ backgroundColor: "transparent", boxShadow: darkMode ? '0 2px 4px -1px #f1f1f2' : "" }}
          >
            <Container maxWidth={false} sx={{ mx: 0 }}>
              <Toolbar disableGutters>
                {/* code for Logo */}
                <Avatar
                  variant="square"
                  alt="Code the Dream logo"
                  src={
                    darkMode
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
                    router.push( "/" );
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
                <Typography
                  variant="8"
                  alignSelf="center"
                  sx={{ color: darkMode ? "#fff" : "#000" }}
                >
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </Typography>

                {/* Box for the user Image and Menu */}
                {session && (
                  <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
                    <Typography
                      variant="body"
                      mr={1}
                      sx={{ color: darkMode ? "#fff" : "#000" }}
                    >
                      Hi, {session.user.name || session.user.gh}
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
                      {settings && settings.map((setting) => (
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
      )}
    </ThemeContext.Consumer>
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
