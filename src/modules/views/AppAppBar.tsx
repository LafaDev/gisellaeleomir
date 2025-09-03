import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "../components/AppBar";
import Toolbar from "../components/Toolbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Icons
import HelpIcon from "@mui/icons-material/Help"; // exemplo de logo no canto esquerdo
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function AppAppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState(1);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        top: isMobile ? "auto" : 0,
        bottom: isMobile ? 0 : "auto",
        px: 0,
        backgroundColor: "#1F1F1F",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
        {!isMobile && (
          <>
            {/* Canto Esquerdo (Logo ou ícone) */}
            <Box
              component="img"
              src="/src/assets/gl.png"
              alt="curvy lines"
              sx={{
                color: "white",
                marginTop: '25px',
                display: "flex",
                alignItems: "center",
                height: "250%",
                width: 'auto',
                opacity: 1,
              }}
            />
            <Box
              sx={{
                display: "flex",
                gap: 4,
                justifyContent: "center",
                flexGrow: 1,
              }}
            >
              <Typography
                variant="button"
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => handleScrollTo("information")}
              >
                Informações
              </Typography>
              <Typography
                variant="button"
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => handleScrollTo("confirmation")}
              >
                Confirmação
              </Typography>
              <Typography
                variant="button"
                sx={{ color: "white", cursor: "pointer" }}
                onClick={() => handleScrollTo("location")}
              >
                Localização
              </Typography>
            </Box>

            {/* Canto Direito (Botão arredondado PRESENÇA) */}
            <Button
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: "50px",
                textTransform: "none",
                fontWeight: "bold",
                px: 3,
              }}
              onClick={() => handleScrollTo("confirmation")}
            >
              PRESENÇA
            </Button>
          </>
        )}

        {/* Mobile BottomNavigation */}
        {isMobile && (
          <BottomNavigation
            showLabels={false}
            value={value}
            onChange={(_, newValue) => {
              setValue(newValue);
              if (newValue === 0) handleScrollTo("information");
              if (newValue === 1) handleScrollTo("confirmation");
              if (newValue === 2) handleScrollTo("location");
            }}
            sx={{
              width: "100%",
              bgcolor: theme.palette.primary.main,
            }}
          >
            <BottomNavigationAction
              icon={<HelpIcon sx={{ color: "white" }} />}
              sx={{ color: "white" }}
            />
            <BottomNavigationAction
              icon={<HowToRegIcon sx={{ fontSize: 40, color: "white" }} />}
              sx={{ color: "white" }}
            />
            <BottomNavigationAction
              icon={<LocationOnIcon sx={{ color: "white" }} />}
              sx={{ color: "white" }}
            />
          </BottomNavigation>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default AppAppBar;
