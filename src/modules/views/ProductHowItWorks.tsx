import type { Theme } from '@mui/material/styles';
import { type SxProps } from '@mui/system';
import Box from '@mui/material/Box';
import Grid from '@mui/material/GridLegacy';
import Container from '@mui/material/Container';
// import Button from '../components/Button';
import Typography from '../components/Typography';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import MobileOffIcon from '@mui/icons-material/MobileOff';
import CurvyLines from "/src/images/Hero/productCurvyLines.png";
import Noivo from "/src/assets/noivo.png";
import Noiva from "/src/assets/noiva.png";

const item: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  px: 3,
  mx: 'auto',
  maxWidth: 300,       // 🔥 keeps both items similar width
  minHeight: 250,      // 🔥 ensures vertical alignment
  textAlign: 'center',
};

// const gapWidths = { xs: 120, sm: 160, md: 220 };


const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: '#4F4A4A',
  fontWeight: 'medium',
};

// const image = {
//   height: 55,
//   my: 3,
// };

function ProductHowItWorks() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={CurvyLines}
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        {/* <Typography variant="h4" marked="center" component="h2" sx={{ mb: 3 }}>
          COM A BENÇÃO DE DEUS E SEUS PAIS
        </Typography>
 */}
        <Typography
          variant="h4"
          marked="center"
          component="h2"
          sx={{
            mb: 3,
            textAlign: { xs: 'center', md: 'center' },
            fontSize: { xs: '1.8rem', md: '2.5rem' }, // ajuste responsivo do tamanho
          }}
        >
          COM A BENÇÃO DE DEUS E SEUS PAIS
        </Typography>
        {/* copy_grid with 2 horizontally aligned items */}
        <div id="copy_grid">
          <Grid
            container
            spacing={5}
            justifyContent="center"
            alignItems="stretch"
          >
            
            <Grid item xs={6} md={6}>
              <Box sx={item}>
                <Box
                  component="img"
                  src={Noiva}
                  alt="suitcase"
                  sx={{ height: 150, my: 2 }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '0.9rem', md: '1.25rem' }, // menor no mobile, maior no desktop
                    textAlign: 'center',
                  }} 
                >
                  ANA PAULA C. RUFFO
                  <br /> <br />
                  GILBERTO V. RUFFO JR
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6} md={6}>
              <Box sx={item}>
                <Box
                  component="img"
                  src={Noivo}
                  sx={{ height: 150, my: 2 }}
                  alt="graph"
                />

                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: '0.9rem', md: '1.25rem' }, // menor no mobile, maior no desktop
                    textAlign: 'center',
                  }}
                >
                  MARIA AUDI DE SOUZA
                  <br /> <br />
                  LEONILSON DE SOUZA
                </Typography> 
              </Box>
            </Grid>
          </Grid>
        </div>
        
      {/* --------------------- */}
      <Box
        id="information"
        component="section"
        sx={{
          "--gap": { xs: "120px", sm: "160px", md: "220px" } as any,
          width: "100%",
          py: { xs: 3, md: 6 },
          display: "flex",
          justifyContent: "center",
        }}
      >
      <Box 
      sx={{ width: "100%", position: "relative" }}>
            {/* Arc SÁBADO */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: { xs: 0.1, md: 8 },
                mb: { xs: 0.1, md: 0.1 },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 300 10"
                style={{
                  width: "calc(var(--gap) * 1.4)",
                  height: 50,
                  overflow: "visible",
                }}
              >
                <defs>
                  <path
                    id="dateArcPath"
                    d="M10,48 A140,48 0 0,1 290,48"
                    fill="transparent"
                  />
                </defs>
                <text
                  textAnchor="middle"
                  style={{
                    fontSize: 18,
                    fontFamily: "serif", // safe font
                    letterSpacing: 2,
                    fill: "#5a5656",
                  }}
                >
                  <textPath href="#dateArcPath" startOffset="50%">
                    •  SÁBADO  •
                  </textPath>
                </text>
              </svg>
            </Box>
        {/* TOP LINE */}
        <Box
          sx={{
            height: "2px",
            mb: { xs: 0.5, md: 1 },
            backgroundImage:
              "linear-gradient(to right, currentColor calc(50% - (var(--gap) / 2)), transparent calc(50% - (var(--gap) / 2)), transparent calc(50% + (var(--gap) / 2)), currentColor calc(50% + (var(--gap) / 2)))",
            color: "#111",
          }}
        />


        {/* Center: OUTUBRO | 18 | 2025 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            mb: { xs: 0.6, md: 1.2 },
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography
              sx={{
                color: "#6b6666",
                fontSize: { xs: 18, md: 28 },
                letterSpacing: 1.2,
                fontFamily: "serif",
              }}
            >
              OUTUBRO
            </Typography>
          </Box>

          <Box
            sx={{
              width: "var(--gap)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 72, md: 120 },
                lineHeight: 1,
                fontFamily: "serif",
                color: "#4f4a4a",
                fontWeight: 400,
              }}
            >
              18
            </Typography>
          </Box>

          <Box sx={{ flex: 1, textAlign: "center" }}>
            <Typography
              sx={{
                color: "#6b6666",
                fontSize: { xs: 18, md: 28 },
                letterSpacing: 1.2,
                fontFamily: "serif",
              }}
            >
              2025
            </Typography>
          </Box>
        </Box>

        {/* BOTTOM LINE */}
        <Box
          sx={{
            height: "2px",
            mt: { xs: 0.6, md: 1.2 },
            backgroundImage:
              "linear-gradient(to right, currentColor calc(50% - (var(--gap) / 2)), transparent calc(50% - (var(--gap) / 2)), transparent calc(50% + (var(--gap) / 2)), currentColor calc(50% + (var(--gap) / 2)))",
            color: "#111",
          }}
        />

        {/* Time */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 1.2, md: 2 } }}>
          <Typography
            sx={{
              color: "#5a5656",
              fontSize: { xs: 18, md: 22 },
              fontFamily: "serif",
            }}
          >
            Às 19h30
          </Typography>
        </Box>
      </Box>
    </Box>

          {/* ---------------------- */}

        {/* <div>
          <Box
            component="img"
            src="/src/assets/datahorario.png"
            alt="data"
            sx={{ height: 150, width: 550, my: 16, marginTop: 0.1, marginBottom: 0.1 }}
          />
        </div> */}
          
        {/* or_grid unchanged */}
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
                  Valorize o momento e minimize distrações.”
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        {/* <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/premium-themes/onepirate/sign-up/"
          sx={{ mt: 8 }}
        >
          Get started
        </Button> */}
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
