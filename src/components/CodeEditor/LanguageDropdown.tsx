// LanguageDropdown.tsx

import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { languageOptions } from "./constants/languageOptions";

// Define the props type
type Props = {
  onSelectChange: (selectedOption: Language) => void;
};

// Define the language type
type Language = {
  value: string;
  label: string;
};

const LanguagesDropdown: React.FC<Props> = ({ onSelectChange }) => {
  return (
    <Autocomplete
      color="primary"
      sx={{ width: 280, boxShadow: 10, }}
      options={languageOptions}
      getOptionLabel={(option) => option.label}
      defaultValue={languageOptions[0]}
      onChange={(event, selectedOption) =>
        onSelectChange(selectedOption as Language)
      }
      // added this prop
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField {...params} label="Filter By Category" variant="outlined" color="primary" />
      )}
    />
  );
};


export default LanguagesDropdown;