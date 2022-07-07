import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';


export const MultipleSelect = ({ items, selectedItems, setSelectedItems, label }) => {

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedItems(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const _renderValue = (selected, label) => {
    if (!selected) return label;
    if (selected.length == 1) {
      return selected[0];
    } else {
      return selected[0] + `+${selected.length - 1}`;
    }
  }
// TODO: Fix styles
  const formControlStyles = {
    minWidth: 125,
    "label": {
      color: "white",
    },
    "& svg": {
      color: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    '& .MuiInputBase-root': {
      boxSizing: "border-box",
    },
    "MuiInputLabel-root": {
      color: "white",
    },
  }

  return (
    <div>
      <FormControl
        sx={formControlStyles}
        size="small">
        {/* TODO: 
              Fix styles
              Conditional rendering "x" that allows clear selected filters */}
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput sx={{ color: "white" }} label="Tag" />}
          renderValue={(selected) => _renderValue(selected, label)}
        >

          {items.map((name) => (
            <MenuItem key={name} value={name} name={name}>
              <Checkbox checked={selectedItems.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
