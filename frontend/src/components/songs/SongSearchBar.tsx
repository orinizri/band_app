import React from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SongSearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
}

const SongSearchBar: React.FC<SongSearchBarProps> = ({
  query,
  onQueryChange,
}) => {
  // const theme = useTheme();

  return (
    <Box mb={3}>
      <TextField
        fullWidth
        placeholder="Search any song..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          sx: {
            backgroundColor: "#faf9f6",
            borderRadius: 2,
            "& input": {
              paddingY: 1.4,
            },
          },
        }}
      />
    </Box>
  );
};

export default SongSearchBar;
