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
  const filterStyle = styled => {

  }
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedItems(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const _renderValue = (selected, label) => {
    if (!selected) return label;
    if (selected.length == 1) {
      return selected[0];
    } else {
      return selected[0] + `+${selected.length-1}`;
    }

  }
  
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
