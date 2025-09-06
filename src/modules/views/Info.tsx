import { type SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/GridLegacy";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import MobileOffIcon from "@mui/icons-material/MobileOff";
import type { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const item: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  px: 3,
  mx: "auto",
  maxWidth: 300,
  minHeight: 250,
  textAlign: "center",
};

const number = {
  fontSize: 24,
  fontFamily: "Quicksand",
  color: "#4F4A4A",
  fontWeight: "bold",
};

function Info() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "secondary.light", overflow: "hidden" }}
    >
      <Container
        sx={{
          mb: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }} 
          id="information"
      >
        {isMobile ? <br /> : Array(5).fill(<br />)}
        <Typography
          variant="h2"
          marked="center"
          color="inherit"
          sx={{
            color: "#757472",
            fontFamily: `"Cinzel", sans-serif !important`,
            fontWeight: 400,
            fontSize: "clamp(2.0rem, 8vw, 3rem)",
            textTransform: "uppercase",
            textAlign: "center",
            mb: 7,
          }}
        >
          Informações Importantes
        </Typography>
        {/* Regras */}
        <div id="or_grid">
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1. Seja pontual.</Box>
                <AccessAlarmIcon sx={{ fontSize: 80, color: "#4F4A4A", mb: 2 }} />
                <Typography variant="h5" align="center" sx={{ fontSize: 17 }}>
                  <b>A cerimônia não irá atrasar. </b><br />
                  Chegar no horário demonstra respeito aos noivos e à cerimônia.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2. Vista-se de acordo.</Box>
                <CheckroomIcon sx={{ fontSize: 80, color: "#4F4A4A", mb: 2 }} />
                <Typography variant="h5" align="center" sx={{ fontSize: 17 }}>
                  <b>Escolha roupas compatíveis com a cerimónia. </b><br />
                  As cores branco e bege claro são exclusivas dos noivos.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3. Respeito o momento.</Box>
                <MobileOffIcon sx={{ fontSize: 80, color: "#4F4A4A", mb: 2 }} />
                <Typography variant="h5" align="center" sx={{ fontSize: 17 }}>
                  <b>Valorize o momento e minimize distrações.</b><br />
                  Não atrapalhe a equipe de foto e vídeo.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  );
}

export default Info;
