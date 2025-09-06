import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import Button from "@mui/material/Button";
import { Fade } from "@mui/material";
import { type SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import sacadaImage from "/src/images/sacada.jpg";
import carrossel1 from "/src/images/carrossel1.jpg";
import carrossel2 from "/src/images/carrossel2.jpg";
import carrossel3 from "/src/images/carrossel3.jpg";
import carrossel4 from "/src/images/carrossel4.jpg";
import carrossel5 from "/src/images/carrossel5.jpg";
import carrossel6 from "/src/images/carrossel6.jpg";
import carrossel7 from "/src/images/carrossel7.jpg";
import carrossel8 from "/src/images/carrossel8.jpg";
import carrossel9 from "/src/images/carrossel9.jpg";

const heading: SxProps<Theme> = {
  fontFamily: `"Cinzel", sans-serif !important`,
  fontWeight: 400,
  fontSize: "clamp(2.0rem, 8vw, 3rem)",
  textTransform: "uppercase",
  textAlign: "center",
  mb: 2,
  color: "#757472",
};

const quote: SxProps<Theme> = {
  fontFamily: `"Quicksand", sans-serif`,
  fontSize: "clamp(1rem, 4vw, 1.5rem)",
  fontStyle: "italic",
  fontWeight: 500,
  textAlign: "center",
  color: "#9A84B7",
  mb: 4,
  px: 2,
  borderLeft: "4px solid #9A84B7",
  pl: 2,
  ml: { xs: 1, sm: 2 },
};

const additionalText: SxProps<Theme> = {
  fontFamily: `"Quicksand", sans-serif`,
  fontSize: "clamp(1rem, 3.1vw, 1rem)",
  fontWeight: 500,
  textAlign: "left",
  color: "#4F4A4A",
  mb: 5,
  px: 2,
};

const carouselImages = [
  carrossel1,
  carrossel2,
  carrossel3,
  carrossel4,
  carrossel5,
  carrossel6,
  carrossel7,
  carrossel8,
  carrossel9,
];

function Casal() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % carouselImages.length);
    resetTimer();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    resetTimer();
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % carouselImages.length);
      }, 4000);
    }
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused]);

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        justifyContent: "center",
        bgcolor: "secondary.light",
        overflow: "hidden",
        py: { xs: 4, sm: 6, md: 8 },
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Heading */}
        <Typography variant="h2" sx={heading} marked="center" color="inherit">
          O CASAL
        </Typography>

        {/* Main Image */}
        <Box
          component="img"
          src={sacadaImage}
          alt="Casal"
          sx={{
            width: "60%",
            maxWidth: 500,
            borderRadius: 2,
            mb: 2,
            userSelect: "none",
            pointerEvents: "none",
            WebkitUserDrag: "none",
          }}
        />

        {/* Description */}
        <Typography
          sx={{
            fontStyle: "italic",
            fontWeight: 400,
            textAlign: "center",
            fontSize: "clamp(0.9rem, 4vw, 1.5rem)",
            marginBottom: 3,
          }}
          variant="h6"
        >
          Com a ajuda de Deus, muita perseverança, dedicação e planejamento, estamos realizando um sonho... <br />
          Iremos nos casar!
        </Typography>

        {/* Stylized Quote */}
        <Typography sx={quote}>
          Sim, grandes coisas fez o Senhor por nós, por isso estamos alegres.
          <br /> Salmos 126:3
        </Typography>

        {/* Additional Text */}
        <Typography sx={additionalText}>
          Estamos realizando um sonho e preparando tudo com muito carinho para curtirmos cada momento com nossos amigos e familiares!
        </Typography>

        {/* Carousel */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: 900,
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 1,
            height: { xs: 300, sm: 500 },
          }}
          // Pause on hover / touch
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {carouselImages.map((src, index) => (
            <Fade in={index === activeIndex} key={index} timeout={600} unmountOnExit>
              <Box
                component="img"
                src={src}
                alt={`Carousel ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 2,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  userSelect: "none",
                  pointerEvents: "none", // disables clicking / long-press menu
                  WebkitUserDrag: "none", // disables dragging on mobile
                }}
              />
            </Fade>
          ))}

          {/* Left / Right buttons with arrows */}
          <Button
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "20%",
              minWidth: 0,
              bgcolor: "rgba(0,0,0,0.2)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.3)" },
              "&:focus": { outline: "none" },
              "&:active": { transform: "none", bgcolor: "rgba(0,0,0,0.2)" },
            }}
          >
            <ArrowBackIosNewIcon sx={{ color: "#fff" }} />
          </Button>
          <Button
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              width: "20%",
              minWidth: 0,
              bgcolor: "rgba(0,0,0,0.2)",
              "&:hover": { bgcolor: "rgba(0,0,0,0.3)" },
              "&:focus": { outline: "none" },
              "&:active": { transform: "none", bgcolor: "rgba(0,0,0,0.2)" },
            }}
          >
            <ArrowForwardIosIcon sx={{ color: "#fff" }} />
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Casal;
