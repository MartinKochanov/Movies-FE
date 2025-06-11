import { Chip, Tooltip } from "@mui/material";

type SelectedGenresChipsProps = {
  genres: string[];
};

export default function SelectedGenres({ genres }: SelectedGenresChipsProps) {
  if (!genres || genres.length === 0) return null;

  const visible = genres.slice(0, 3);
  const hidden = genres.slice(3);

  return (
    <>
      {visible.map((g) => (
        <Chip key={g} label={g} color="primary" />
      ))}
      {hidden.length > 0 && (
        <Tooltip
          title={
            <div>
              {hidden.map((g) => (
                <div key={g}>{g}</div>
              ))}
            </div>
          }
          arrow
          placement="top"
        >
          <Chip label={`+${hidden.length}`} color="primary" sx={{ cursor: "pointer" }} />
        </Tooltip>
      )}
    </>
  );
}
