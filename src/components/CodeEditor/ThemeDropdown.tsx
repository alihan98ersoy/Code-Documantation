// ThemeDropdown.tsx

import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import monacoThemes from "monaco-themes/themes/themelist.json";

// Define the props type
type Props = {
  handleThemeChange: (selectedOption: Theme) => void;
  theme: Theme | null;
};

// Define the theme type
type Theme = {
  value: string;
  label: string;
};

const ThemeDropdown: React.FC<Props> = ({ handleThemeChange, theme }) => {
  return (
    <Autocomplete
      sx={{ width: 280, boxShadow: 10 }}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      getOptionLabel={(option) => option.label}
      value={theme}
      onChange={(event, selectedOption) =>
        handleThemeChange(selectedOption as Theme)
      }
      // added this prop
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField {...params} label="Select Theme" variant="outlined" />
      )}
    />
  );
};

export default ThemeDropdown;
