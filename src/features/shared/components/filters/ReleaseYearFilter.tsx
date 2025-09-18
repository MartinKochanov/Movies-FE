import { Box, Slider, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { useEffect, useState } from "react";

const YearContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  padding: theme.spacing(1),
}));

const YearInputs = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
  alignItems: "center",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1),
  },
}));

interface ReleaseYearFilterProps {
  value: number | undefined;
  onChange: (year: number | undefined) => void;
  minYear?: number;
  maxYear?: number;
}

export default function ReleaseYearFilter({
  value,
  onChange,
  minYear = 1900,
  maxYear = new Date().getFullYear() + 5,
}: ReleaseYearFilterProps) {
  const [yearRange, setYearRange] = useState<[number, number]>([value || minYear, maxYear]);

  useEffect(() => {
    if (value) {
      setYearRange([value, maxYear]);
    } else {
      setYearRange([minYear, maxYear]);
    }
  }, [value, minYear, maxYear]);

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    const newRange = newValue as [number, number];
    setYearRange(newRange);

    // Only set the filter if it's not the full range
    if (newRange[0] > minYear) {
      onChange(newRange[0]);
    } else {
      onChange(undefined);
    }
  };

  const handleInputChange = (index: 0 | 1) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value) || minYear;
    const newRange: [number, number] = [...yearRange];
    newRange[index] = Math.max(minYear, Math.min(maxYear, newValue));
    setYearRange(newRange);

    if (index === 0 && newRange[0] > minYear) {
      onChange(newRange[0]);
    } else if (index === 0) {
      onChange(undefined);
    }
  };

  const handleClear = () => {
    setYearRange([minYear, maxYear]);
    onChange(undefined);
  };

  return (
    <YearContainer>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Release Year
        </Typography>
        {value && (
          <Typography
            variant="body2"
            color="primary"
            onClick={handleClear}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Clear
          </Typography>
        )}
      </Box>

      <Slider
        value={yearRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={minYear}
        max={maxYear}
        step={1}
        marks={[
          { value: minYear, label: minYear.toString() },
          { value: maxYear, label: maxYear.toString() },
        ]}
        sx={{ mt: 2 }}
      />

      <YearInputs>
        <StyledTextField
          size="small"
          label="From"
          type="number"
          value={yearRange[0]}
          onChange={handleInputChange(0)}
          inputProps={{ min: minYear, max: maxYear }}
          sx={{ width: 100 }}
        />
        <Typography variant="body2" color="text.secondary">
          to
        </Typography>
        <StyledTextField
          size="small"
          label="To"
          type="number"
          value={yearRange[1]}
          onChange={handleInputChange(1)}
          inputProps={{ min: minYear, max: maxYear }}
          sx={{ width: 100 }}
        />
      </YearInputs>
    </YearContainer>
  );
}
