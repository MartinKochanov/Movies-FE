import { styled } from "@mui/material/styles";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, type SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { useRef } from "react";

import { useMoviesQuery } from "../../hooks/movies/useMoviesQuery";
import { type Movie } from "../../types/Movie";
import SeriesSection from "../series/SeriesSection";
import Spinner from "../shared/components/Spinner";
import MovieSection from "./MovieSection";
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

export default function HomePage() {
  const { data: movies, isFetched } = useMoviesQuery(0, 10, { sortField: "releaseYear", sortOrder: "desc" });

  const swiperRef = useRef<SwiperRef | null>(null);

  const isTouchDevice = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  const handleMouseEnter = () => {
    swiperRef?.current?.swiper.autoplay.stop();
  };

  const handleMouseLeave = () => {
    swiperRef?.current?.swiper.autoplay.start();
  };

  const handleTrailerPlay = (isPlaying: boolean) => {
    if (isPlaying) {
      swiperRef?.current?.swiper.autoplay.stop(); // Stop autoplay when trailer starts
    } else {
      swiperRef?.current?.swiper.autoplay.start(); // Resume autoplay when trailer stops
    }
  };

  return (
    <>
      {isFetched ? (
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
            {movies?.content.map((movie: Movie) => (
              <SwiperSlide key={movie.title}>
                <MovieSlide movie={movie} onTrailerPlay={handleTrailerPlay} />
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </div>
      ) : (
        <Spinner />
      )}

      <MovieSection />
      <SeriesSection />
    </>
  );
}
