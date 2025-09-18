import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { styled } from "@mui/material/styles";

const SortContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(1),
}));

const SortRow = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center",
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1),
  },
}));

interface SortFilterProps {
  sortField: string;
  sortOrder: "asc" | "desc";
  onSortChange: (field: string, order: "asc" | "desc") => void;
}

const SORT_OPTIONS = [
  { value: "title", label: "Title" },
  { value: "releaseYear", label: "Release Year" },
  { value: "duration", label: "Duration" },
  { value: "createdAt", label: "Date Added" },
];

const ORDER_OPTIONS = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

export default function SortFilter({ sortField, sortOrder, onSortChange }: SortFilterProps) {
  const handleFieldChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value, sortOrder);
  };

  const handleOrderChange = (event: SelectChangeEvent) => {
    onSortChange(sortField, event.target.value as "asc" | "desc");
  };

  return (
    <SortContainer>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Sort by
      </Typography>

      <SortRow>
        <StyledFormControl size="small">
          <InputLabel>Field</InputLabel>
          <Select value={sortField} onChange={handleFieldChange} label="Field">
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>

        <StyledFormControl size="small">
          <InputLabel>Order</InputLabel>
          <Select value={sortOrder} onChange={handleOrderChange} label="Order">
            {ORDER_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </SortRow>
    </SortContainer>
  );
}
