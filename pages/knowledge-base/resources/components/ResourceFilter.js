import React, { useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;

export const MultipleSelect = ({ items, selectedItems, setSelectedItems, label }) => {

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedItems(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
      <div>
      <FormControl sx={{ m: 1, width: 200, minWidth: 100 }} size="small">
        {/* TODO: Fix styles */}
        <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
        <Select
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => label}
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
