import { styled } from "@mui/material/styles";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, type SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { useRef } from "react";

import { Genre, type Movie } from "../../types/Movie";
import MovieSlide from "./MovieSlide";

// Styled Swiper wrapper
const StyledSwiper = styled(Swiper)(({ theme }) => ({
  width: "100%",
  height: "80vh",
  "& .swiper-slide": {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  "& .swiper-pagination-bullet": {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up("xl")]: {
      width: "13px",
      height: "13px",
    },
  },
  "& .swiper-button-next, & .swiper-button-prev": {
    color: theme.palette.primary.main,
    padding: "0 5em",
    "@media (hover: none) and (pointer: coarse)": {
      display: "none",
    },
  },
}));

const trendingMovies = [
  {
    id: "1",
    title: "The Dark Knight",
    tagline: "EVERY EPISODE STREAMING NOW",
    duration: 152,
    releaseYear: 2008,
    genre: [Genre.ACTION, Genre.CRIME, Genre.DRAMA],
    image:
      "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/05/0_c9S8ajFBpwX89ZuU0.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
  },
  {
    id: "2",
    title: "Inception",
    tagline: "WATCH THE MIND-BENDING THRILLER",
    duration: 152,
    releaseYear: 2010,
    genre: [Genre.ACTION, Genre.ADVENTURE, Genre.SCI_FI],
    image:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2019/12/Inception.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5",
  },
  {
    id: "3",
    title: "Interstellar",
    tagline: "A JOURNEY BEYOND THE STARS",
    duration: 152,
    releaseYear: 2014,
    genre: [Genre.ACTION, Genre.ADVENTURE, Genre.DRAMA],
    image:
      "https://images.bauerhosting.com/legacy/empire-tmdb/films/157336/images/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=992&q=80",
  },
];

export default function HomePage() {
  const swiperRef = useRef<SwiperRef | null>(null);

  const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  const handleMouseEnter = () => {
    swiperRef?.current?.swiper.autoplay.stop();
  };

  const handleMouseLeave = () => {
    swiperRef?.current?.swiper.autoplay.start();
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <StyledSwiper
        ref={swiperRef}
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={!isTouchDevice}
        speed={1500}
        spaceBetween={0}
        slidesPerView={1}
        cssMode={isTouchDevice}
      >
        {trendingMovies.map((movie: Movie) => (
          <SwiperSlide key={movie.title}>
            <MovieSlide movie={movie} />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </div>
  );
}
