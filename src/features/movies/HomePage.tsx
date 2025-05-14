import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, type SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { useRef } from "react";

// Styled Swiper
const StyledSwiper = styled(Swiper)(({ theme }) => ({
  "& .swiper-slide": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: theme.palette.text.primary,
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
    image:
      "https://creativereview.imgix.net/content/uploads/2024/12/AlienRomulus-scaled.jpg?auto=compress,format&q=60&w=729&h=1080",
    rating: 9.0,
  },
  {
    title: "Inception",
    image: "https://m.media-amazon.com/images/I/71eHZFw+GlL._AC_SL1000_.jpg",
    rating: 8.8,
  },
  {
    title: "Interstellar",
    image: "https://i.etsystatic.com/39153669/r/il/d36f4d/4473413805/il_794xN.4473413805_jjvj.jpg",
    rating: 8.6,
  },
];

export default function HomePage() {
  const swiperRef = useRef<SwiperRef | null>(null);

  // Stop autoplay on hover, resume when hover ends
  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <Box sx={{ backgroundColor: "#121212", py: 6 }}>
      <Typography
        variant="h2"
        sx={{
          color: "#fff",
          textAlign: "center",
          mb: 4,
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: 2,
        }}
      >
        Trending Movies
      </Typography>

      <StyledSwiper
        ref={swiperRef}
        modules={[Navigation, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={100}
        slidesPerView={1}
        speed={2000}
        loop={true} // Enables looping through slides continuously
        onMouseEnter={handleMouseEnter} // Stop autoplay on hover
        onMouseLeave={handleMouseLeave} // Resume autoplay when hover ends
      >
        {trendingMovies.map((movie) => (
          <SwiperSlide key={movie.title}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
                px: 4,
                py: 4,
                background: "linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.4))",
                borderRadius: 3,
              }}
              onMouseEnter={handleMouseEnter} // Stop autoplay on hover
              onMouseLeave={handleMouseLeave} // Resume autoplay when hover ends
            >
              {/* Movie Poster */}
              <Box
                component="img"
                src={movie.image}
                alt={movie.title}
                sx={{
                  width: { xs: "95%", md: "75%" }, // Bigger on desktop
                  height: { xs: "auto", md: "720px" }, // Taller
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                  mr: { md: 4 },
                  mb: { xs: 3, md: 0 },
                  transition: "transform 0.5s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              />

              {/* Movie Info */}
              <Box sx={{ color: "#fff", maxWidth: 500 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="subtitle1" color="gray" gutterBottom>
                  Rating: ⭐ {movie.rating}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    mt: 2,
                    borderRadius: "30px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    boxShadow: "0 5px 15px rgba(239,108,0,0.5)", // #EF6C00 shadow
                  }}
                >
                  Watch Now
                </Button>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Box>
  );
}
