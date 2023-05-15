import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeContext } from "../theme/ThemeContextWrapper";
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
import axios from "axios";

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElPages, setAnchorElPages] = useState(null);
  const { mode, changeTheme } = useContext(ThemeContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [resourceMenuPages, setResourceMenuPages] = useState([]);

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

  const handlePagesMenuOpen = (event) => {
    setAnchorElPages(event.currentTarget);
  };

  // open the Menu when clicked on the avatar
  const handleUserMenuOpen = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // close the Menu when you select any Menu item
  const handleMenuClose = () => {
    setAnchorElUser(null);
    setAnchorElPages(null);
  };

  //v1 student resources
  useEffect(() => {
    try {
      axios
        .get(`/api/v1/student-resources`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          const pages = res.data.data.map((item) => {
            return {
              href: "/resources/" + item.slug,
              target: "_self",
              title: item.title,
              wordpress_id: item.wordpress_id,
              slug: item.slug,
              _id: item._id,
            };
          });
          setResourceMenuPages(pages);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AppBar
      enableColorOnDark
      position="static"
      color="transparent"
      sx={{
        boxShadow: mode === "dark" ? "0 2px 4px -1px #C8C8CC" : "",
        width: "100%",
      }}
    >
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          {/* code for Logo */}
          <Avatar
            variant="square"
            alt="Code the Dream logo"
            src={
              mode === "dark"
                ? "/img/logo/BookLogoGradient.png"
                : "/img/logo/BookLogoGradient.png"
            }
            sx={{
              mr: 0.125,
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
                margin: "20px",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              {/* Start Static Pages Menu */}
              <Typography
                variant="h7"
                mr={4}
                onClick={handlePagesMenuOpen}
                sx={{ cursor: "pointer" }}
              >
                Student Resources
              </Typography>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElPages}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                keepMounted
                open={Boolean(anchorElPages)}
                onClose={handleMenuClose}
              >
                {resourceMenuPages &&
                  resourceMenuPages.map((page) => (
                    <MenuItem
                      key={page._id}
                      onClick={() => {
                        handleMenuClose;
                      }}
                      component={Link}
                      href={page.href}
                      target={page.target}
                      rel="noopener noreferrer"
                    >
                      <div
                        style={{
                          width: "20rem",
                          padding: "2px 0 2px 0",
                          margin: "5px",
                          wordWrap: "break-word",
                        }}
                      >
                        <Typography
                          variant="body1"
                          textAlign="center"
                          style={{ whiteSpace: "normal" }}
                        >
                          {page.title}
                        </Typography>
                      </div>
                    </MenuItem>
                  ))}
              </Menu>
              {/* End Static Pages Menu */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                {/* Start User Account Menu */}
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleUserMenuOpen}
                    sx={{ p: 0 }}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                  >
                    <Typography variant="h6" mr={1}>
                      {session.user.name || session.user.gh}
                    </Typography>
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
                  {/* End User Account Menu */}
                </Menu>
              </Box>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
