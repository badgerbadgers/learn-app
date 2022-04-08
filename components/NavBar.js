import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogIn from "./Login";

const NavBar = () => {
  const { data: session, status } = useSession();

  const [anchorEl, setAnchorEl] = useState(null);

  //change to more normal JS
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
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
          </IconButton>
          <Menu
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
          </Typography>
          {status === "authenticated" ? (
            <>
              {session.user.name || session.user.gh} <br />
              <button onClick={() => signOut()}>Sign out</button>
            </>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
