import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { Grid, Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  AddBoxOutlined,
  AddCircleOutlineOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

// stlyling the search input
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0),
    width: "auto",
  },
}));

// stlyling the search input icon
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// stlyling the menu input
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "25ch",
    },
  },
}));

// stlyling the dropdown menu for listing
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.25),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
})); // End of styling section

function ReseourceToolBar({ resources, searchTerm, setSearchTerm }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterByType, setFilterByType] = useState(false);
  const open = Boolean(anchorEl);

  // Events handlers to anchor the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // *** SEARCH SECTION START HERE ***
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // *** FILTERS SECTION START HERE ***
  // destructuring the state filter by type and filter reponse
  const { cheatsheet, coding, concepts, docs, exercises, other } = filterByType;
  const error =
    [cheatsheet, coding, concepts, docs, exercises, other].filter((v) => v)
      .length !== 5;

  const handleFilterByTypeChange = (e) => {
    setFilterByType({
      ...filterByType,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <Grid item xs={12} sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e)}
            />
          </Search>
          <Stack
            spacing={1}
            size="small"
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "end",
              justifyContent: "space-between",
              flexWrap: "nowrap",
            }}
          >
            <div>
              <Button
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                // startIcon={<AddCircleOutlineOutlined />}
                startIcon={<AddBoxOutlined />}
              >
                Resource
              </Button>
              {/* <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <MenuItem onClick={handleClose}>Add New Resource</MenuItem>
              </Menu> */}
            </div>

            <div>
              <Button
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Type
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  <Box sx={{ display: "flex" }}>
                    <FormControl
                      sx={{ m: 2 }}
                      component="fieldset"
                      variant="standard"
                    >
                      <FormLabel component="legend">Resource Type</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={cheatsheet}
                              onChange={handleFilterByTypeChange}
                              name="cheatsheet"
                            />
                          }
                          label="Cheatsheet"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={coding}
                              onChange={handleFilterByTypeChange}
                              name="coding"
                            />
                          }
                          label="Coding"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={concepts}
                              onChange={handleFilterByTypeChange}
                              name="concepts"
                            />
                          }
                          label="Concepts"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={docs}
                              onChange={handleFilterByTypeChange}
                              name="docs"
                            />
                          }
                          label="Docs"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={exercises}
                              onChange={handleFilterByTypeChange}
                              name="exercises"
                            />
                          }
                          label="Exercises"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={other}
                              onChange={handleFilterByTypeChange}
                              name="other"
                            />
                          }
                          label="Other"
                        />
                      </FormGroup>
                    </FormControl>
                  </Box>
                </MenuItem>
              </StyledMenu>
            </div>
            <div>
              <Button
                id="demo-customized-button2"
                aria-controls={open ? "demo-customized-menu2" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Topic
              </Button>

              {/* <StyledMenu
                id="demo-customized-menu3"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button3",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  {topic &&
                    topic.map((item) => {
                      reurn(
                        <ul key={item} style={{ listStyle: "none" }}>
                          <li>{topic}</li>
                        </ul>
                      );
                    })}
                </MenuItem>
              </StyledMenu> */}
            </div>
            <div>
              <Button
                id="demo-customized-button3"
                aria-controls={open ? "demo-customized-menu3" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Language
              </Button>
              {/* <StyledMenu
                id="demo-customized-menu3"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button3",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  {language &&
                    language.map((item) => {
                      reurn(
                        <ul key={item} style={{ listStyle: "none" }}>
                          <li>{language}</li>
                        </ul>
                      );
                    })}
                </MenuItem>
              </StyledMenu> */}
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default ReseourceToolBar;
