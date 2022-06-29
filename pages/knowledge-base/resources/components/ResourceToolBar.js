import React from "react";
import AppBar from "@mui/material/AppBar";
import { Grid, Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../../../lib/searchUtils";
import { MultipleSelect } from "./ResourceFilter";

// The code starts here
function ResourceToolBar({
  searchTerm,
  setSearchTerm,
  languages,
  selectedLanguages,
  setSelectedLanguages,
  topics,
  selectedTopics,
  setSelectedTopics,
  types,
  selectedTypes,
  setSelectedTypes,
  label
}) {

  // *** SEARCH SECTION START HERE ***
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
          <MultipleSelect items={languages} 
            selectedItems={selectedLanguages} 
            setSelectedItems={setSelectedLanguages} 
            label="Language"
          />
          
          <MultipleSelect items={topics} 
            selectedItems={selectedTopics} 
            setSelectedItems={setSelectedTopics} 
            label="Topic"
          />
          <MultipleSelect items={types} 
            selectedItems={selectedTypes} 
            setSelectedItems={setSelectedTypes} 
            label="Type"
          />

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
          />
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default ResourceToolBar;
