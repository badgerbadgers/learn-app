import React, { useState, useEffect, useContext} from "react";
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
import Link from "next/link";
import getData from "../lib/getData"

const NavBar = ({user}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { mode, changeTheme } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState(null);
  const { data: session, status } = useSession();

  const router = useRouter();
  const url = "/api/users";
  const id = session.user.gh;

// Getting the first and last names of the user to show next to their avatar. Sometimes the gitHub name / id are too long and in Mobile View they cramp up in the NavBar. 
//So we get their first and last name from the userform to display their initials. 

   useEffect(() => {
    const params = { params: { id: id } };
    if (id) {

      (async () => {
        await getData(params, url).then((data) => {
          setUserName(`${data.firstName} ${data.lastName}`);
          console.log(data);
        });
      })();
    }
  }, [id]);

console.log(user)
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
    <>
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
              variant="h6"
              alignSelf="center"
              sx={{ color: mode === 'dark' ? "#fff" : "#000" }}// maxWidth: '47px',
            >
              {mode === "dark" ? "Light Mode" : "Dark Mode"}
            </Typography>

            {/* Box for the user Image and Menu */}

            {session && (
              <Box sx={{ flexGrow: 0, marginLeft: "auto", display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="h6"
                  mr={1}
                  sx={{ color: mode === "dark" ? "#fff" : "#000" }}
                >
                  {/* only getting the Initials from the first and Last Names */}
                  {userName.match(/(\b\S)?/g).join("")}
    
                </Typography>

                <Tooltip title="Open settings" role="UL Div">
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
                        <Link href={setting.href}>
                        <a
                          target={setting.target}
                          rel="noopener noreferrer"
                          onClick={setting.onClick}
                        >
                          <Typography variant='body1' textAlign="center">
                            {setting.title}
                          </Typography>
                        </a>
                        </Link>
                      </MenuItem>
                    ))}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default NavBar;