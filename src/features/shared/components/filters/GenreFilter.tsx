import { List, ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import { styled } from "@mui/material/styles";

import { useState } from "react";

import { Genre } from "../../../../types/Movie";

const GenreList = styled(List)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexWrap: "wrap",
    gap: theme.spacing(1),
    padding: 0,
  },
}));

const GenreListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.background.default,
  color: selected ? theme.palette.common.white : theme.palette.text.primary,
  borderRadius: 8,
  marginBottom: theme.spacing(1),
  transition: "background 0.2s",
  "&:hover": {
    backgroundColor: selected ? theme.palette.primary.dark : theme.palette.grey[400],
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: 0,
    marginRight: theme.spacing(1),
    minWidth: 80,
    padding: theme.spacing(0.5, 1),
  },
}));

const GenreSearchContainer = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const GenreSearchInput = styled("input")(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  fontSize: "0.875rem",
  "&:focus": {
    outline: `2px solid ${theme.palette.primary.main}`,
    borderColor: theme.palette.primary.main,
  },
}));

type GenreFilterProps = {
  selectedGenres: string[];
  onGenreClick: (genre: string) => void;
};

export default function GenreFilter({ selectedGenres, onGenreClick }: GenreFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGenres = Object.keys(Genre).filter((genreKey) =>
    Genre[genreKey as keyof typeof Genre].replace(/_/g, " ").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <GenreSearchContainer>
        <GenreSearchInput
          type="text"
          placeholder="Search genres..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </GenreSearchContainer>

      <GenreList>
        {filteredGenres.map((genreKey) => (
          <GenreListItemButton
            key={genreKey}
            onClick={() => onGenreClick(genreKey)}
            selected={selectedGenres.includes(genreKey)}
          >
            <ListItemText primary={Genre[genreKey as keyof typeof Genre].replace(/_/g, " ")} />
          </GenreListItemButton>
        ))}
      </GenreList>
    </>
  );
}
