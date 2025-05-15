import { styled } from "@mui/material/styles";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, type SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { useRef } from "react";

import type { Movie } from "../../types/Movie";
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
  },
  "& .swiper-button-next, & .swiper-button-prev": {
    color: theme.palette.primary.main,
  },
}));

const trendingMovies = [
  {
    title: "The Dark Knight",
    description: "EVERY EPISODE STREAMING NOW",
    genre: "Action • Drama",
    image:
      "https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/05/0_c9S8ajFBpwX89ZuU0.jpg?q=70&fit=crop&w=1140&h=&dpr=1",
    rating: 9.0,
  },
  {
    title: "Inception",
    description: "WATCH THE MIND-BENDING THRILLER",
    genre: "Sci-Fi • Thriller",
    image:
      "https://static1.srcdn.com/wordpress/wp-content/uploads/2019/12/Inception.jpg?q=50&fit=crop&w=1140&h=&dpr=1.5",
    rating: 8.8,
  },
  {
    title: "Interstellar",
    description: "A JOURNEY BEYOND THE STARS",
    genre: "Adventure • Sci-Fi",
    image:
      "https://images.bauerhosting.com/legacy/empire-tmdb/films/157336/images/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=992&q=80",
    rating: 8.6,
  },
];

export default function HomePage() {
  const swiperRef = useRef<SwiperRef | null>(null);

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
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={0}
        slidesPerView={1}
        loop
        speed={1500}
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
