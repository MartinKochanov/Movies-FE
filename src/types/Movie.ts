export type Movie = {
  id: string;
  title: string;
  tagline: string;
  duration: number;
  releaseYear: number;
  genres: Genre[];
  series: boolean;
  imageUrl: string;
  trailerUrl: string;
};

export enum Genre {
  ACTION = "Action",
  ADVENTURE = "Adventure",
  ANIMATION = "Animation",
  BIOGRAPHY = "Biography",
  COMEDY = "Comedy",
  CRIME = "Crime",
  DOCUMENTARY = "Documentary",
  DRAMA = "Drama",
  FAMILY = "Family",
  FANTASY = "Fantasy",
  HISTORY = "History",
  HORROR = "Horror",
  MUSIC = "Music",
  MYSTERY = "Mystery",
  ROMANCE = "Romance",
  SCI_FI = "Sci-Fi",
  THRILLER = "Thriller",
  WAR = "War",
  WESTERN = "Western",
  SPORT = "Sport",
  MUSICAL = "Musical",
  PARODY = "Parody",
  EPIC = "Epic",
  SUSPENSE = "Suspense",
  NOIR = "Noir",
  SLASHER = "Slasher",
  ROMANTIC_COMEDY = "Romantic_Comedy",
  ART_HOUSE = "Art_House",
  CULT = "Cult",
  INDIE = "Indie",
  SUPERHERO = "Superhero",
  ROAD_MOVIE = "Road_Movie",
  FABLE = "Fable",
  GOTHIC = "Gothic",
  PSYCHOLOGICAL = "Psychological",
  SPOOF = "Spoof",
  GIALLO = "Giallo",
  ZOMBIE = "Zombie",
  STEAMPUNK = "Steampunk",
  TRAGEDY = "Tragedy",
  DARK_COMEDY = "Dark_Comedy",
  MOCKUMENTARY = "Mockumentary",
}

export type MovieDetails = {
  id: string;
  title: string;
  duration: number;
  releaseYear: number;
  genres: Genre[];
  plot: string;
  tagline: string;
  imageUrl: string;
  trailerUrl: string;
  filmStudio: string;
  basedOn: string;
  series: boolean;
  cast: CastMember[];
  directedBy: CastMember[];
  producers: CastMember[];
  writers: CastMember[];
};

export type CastMember = {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  role: Role;
};

export type Role = {
  id: string;
  name: string;
};
