import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";

// const item: SxProps<Theme> = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "flex-start",
//   px: 3,
//   mx: "auto",
//   maxWidth: 300,
//   minHeight: 250,
//   textAlign: "center",
// };

function ProductHowItWorks() {
  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-10-18T19:30:00");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "secondary.light", overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 5,
          mb: 4,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Box
          component="img"
          src={CurvyLines}
          alt="curvy lines"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            opacity: 0.7,
          }}
        /> */}
        <Typography
          variant="h5"
          marked="center"
          component="h2"
          sx={{
            textTransform: "uppercase",
            fontFamily: "'Cinzel', serif",
            fontWeight: "normal",
            mb: 1,
            textAlign: { xs: "center", md: "center" },
            fontSize: { xs: "2.4rem", md: "2rem" },
          }}
        >
          CONTAGEM REGRESSIVA
        </Typography>

        {/* Countdown */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: 1, md: 3 },
            mt: 3,
            mb: 5,
            flexWrap: "nowrap", // ✅ force one line
          }}
        >
          {["dias", "horas", "minutos", "segundos"].map((label, idx) => {
            const values = [
              timeLeft.days,
              timeLeft.hours,
              timeLeft.minutes,
              timeLeft.seconds,
            ];
            return (
              <Box
                key={label}
                sx={{
                  textAlign: "center",
                  minWidth: { xs: 60, md: 90 },
                  px: { xs: 2, md: 2 },
                  py: { xs: 1.5, md: 1.5 },
                  borderRadius: 2,
                  backgroundColor: "#9A84B7",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: 36, md: 36 },
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Quicksand, serif",
                    lineHeight: 1.1,
                  }}
                >
                  {values[idx]}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 10, md: 14 },
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: "Quicksand, serif",
                    textTransform: "uppercase",
                    mt: 0.2,
                  }}
                >
                  {label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
