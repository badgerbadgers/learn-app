import React from "react";
import AppBar from "@mui/material/AppBar";
import { Button, Divider, Grid, Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from '@mui/icons-material/Tune';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../../../lib/searchUtils";
import { MultipleSelect } from "./ResourceFilter";


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
          <Stack
            spacing={1}
            size="small"
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "nowrap",
            }}>
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
            {/* TODO: change color of the dividers to comply with light/dark themes */}
            <Divider orientation="vertical" flexItem sx={{ bgcolor: "#ff9b82" }} />

            <TuneIcon />

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

            <Divider orientation="vertical" flexItem sx={{ bgcolor: "#ff9b82" }} />
            
            <Button variant="outlined" size="medium"
              sx={{ color: "white", borderColor: "white" }}
            >
              Add Resource
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default ResourceToolBar;
