import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Grid, Stack, Divider } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AddBoxOutlined, AddCircleOutlineOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledMenu,
} from "../../../../lib/searchUtils";

// The code starts here
function ReseourceToolBar({
  resources,
  searchTerm,
  setSearchTerm,
  setFilterType,
  // id,
  // name,
  // handleClickOption,
  // setIsCheck,
  // isCheck,
  isCheckedAll,
}) {
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

  const handleFilterByTypeChange = (e) => {
    setFilterByType({
      ...filterByType,
      setFilterType,
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
                      <FormLabel component="legend">
                        Type of Resources
                      </FormLabel>
                      <Divider />
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              id="selectAll"
                              name="selectAll"
                              checked={isCheckedAll}
                              onChange={(e) => {
                                setSearchTerm(e.target.name);
                                setFilterType(e.target.value);
                              }}
                            />
                          }
                          label="Select All"
                        >
                          {resources}
                        </FormControlLabel>

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={cheatsheet}
                              onChange={(e) => {
                                setSearchTerm(e.target.name);
                                setFilterType(e.target.value);
                              }}
                              name="cheatsheet"
                              value="Name"
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
          </Stack>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default ReseourceToolBar;
