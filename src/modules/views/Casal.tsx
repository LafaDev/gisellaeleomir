import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import { type SxProps } from "@mui/system";
import type { Theme } from "@mui/material/styles";
import sacadaImage from "/src/images/sacada.jpg"; // make sure path is correct

const heading: SxProps<Theme> = {
  fontFamily: `"Quicksand", sans-serif !important`,
  fontWeight: 400,
  fontSize: "clamp(2.0rem, 8vw, 3rem)",
  textTransform: "uppercase",
  textAlign: "center",
  mb: 2,
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

function Casal() {
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
          CASAL
        </Typography>

        {/* Main Image */}
        <Box
          component="img"
          src={sacadaImage}
          alt="Casal"
          sx={{
            width: "100%",
            maxWidth: 500,
            borderRadius: 2,
            mb: 3,
          }}
        />

        {/* Description (italic & thin) */}
        <Typography sx={{ fontStyle: "italic", fontWeight: 400, textAlign: "center", fontSize: "clamp(1rem, 4vw, 1.5rem)", marginBottom: 3 }} variant="h6">
          Com a ajuda de Deus, muita perseverança, dedicação e planejamento, estamos realizando um sonho.... Iremos nos casar! ...
        </Typography>

        {/* Stylized Quote (with vertical line) */}
        <Typography sx={quote}>
          Sim, grandes coisas fez o Senhor por nós, por isso estamos alegres.
          <br /> Salmos 126:3
        </Typography>

        {/* Additional Text (thin & left aligned) */}
        <Typography sx={additionalText}>
          Estamos realizando um sonho e preparando tudo com muito carinho para curtirmos cada momento com nossos amigos e familiares!
        </Typography>
      </Container>
    </Box>
  );
}

export default Casal;
