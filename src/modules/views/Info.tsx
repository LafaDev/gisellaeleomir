import { type SxProps } from "@mui/system";
import Box from "@mui/material/Box";
import Grid from "@mui/material/GridLegacy";
import Container from "@mui/material/Container";
import Typography from "../components/Typography";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import MobileOffIcon from "@mui/icons-material/MobileOff";
import type { Theme } from "@mui/material/styles";

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
  return (
    <Box
      component="section"
      sx={{ display: "flex", bgcolor: "secondary.light", overflow: "hidden" }}
    >
      <Container
        sx={{
          mt: 0,
          mb: 15,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Regras */}
        <div id="or_grid">
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1. Seja pontual.</Box>
                <AccessAlarmIcon sx={{ fontSize: 80, color: "#4F4A4A", mb: 2 }} />
                <Typography variant="h5" align="center">
                  Chegar no horário demonstra respeito aos noivos e à cerimônia.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2. Vista-se de acordo.</Box>
                <CheckroomIcon sx={{ fontSize: 80, color: "#4F4A4A", mb: 2 }} />
                <Typography variant="h5" align="center">
                  Escolha roupas compatíveis com a cerimónia.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3. Respeito o momento.</Box>
                <MobileOffIcon sx={{ fontSize: 80, color: "#4F4A4A", mb: 2 }} />
                <Typography variant="h5" align="center">
                  Valorize o momento e minimize distrações.
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
