import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
import "swiper/swiper-bundle.css";

import MovieSlide from "./MovieSlide";

// Styled Swiper wrapper
const StyledSwiper = styled(Swiper)(({ theme }) => ({
  width: "100%",
  height: "100vh",
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
    image: "https://m.media-amazon.com/images/I/A1exRxgHRRL._AC_SL1500_.jpg",
    rating: 9.0,
  },
  {
    title: "Inception",
    description: "WATCH THE MIND-BENDING THRILLER",
    genre: "Sci-Fi • Thriller",
    image: "https://m.media-amazon.com/images/I/71uKM+LdgFL._AC_SL1000_.jpg",
    rating: 8.8,
  },
  {
    title: "Interstellar",
    description: "A JOURNEY BEYOND THE STARS",
    genre: "Adventure • Sci-Fi",
    image: "https://m.media-amazon.com/images/I/71JC2qvPx5L._AC_SL1000_.jpg",
    rating: 8.6,
  },
];

export default function HomePage() {
  return (
    <>
      <StyledSwiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={0}
        slidesPerView={1}
        loop
        speed={1500}
      >
        {trendingMovies.map((movie) => MovieSlide({ movie }))}
      </StyledSwiper>
    </>
  );
}
