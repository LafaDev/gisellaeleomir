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
import imgGl from "/src/assets/gl.png";

// Icons
import HelpIcon from "@mui/icons-material/Help";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function AppAppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState("confirmation");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (newValue === "information") handleScrollTo("information");
    if (newValue === "confirmation") handleScrollTo("confirmation");
    if (newValue === "location") handleScrollTo("location");
  };

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
        backgroundColor: "#F6F2FB",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
        {!isMobile && (
          <>
            {/* Logo canto esquerdo */}
            <Box
              component="img"
              src={imgGl}
              alt="logo"
              sx={{
                marginTop: "25px",
                display: "flex",
                alignItems: "center",
                height: "250%",
                width: "auto",
                opacity: 1,
              }}
            />

            {/* Links centrais */}
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
                sx={{ color: "#757472", cursor: "pointer" }}
                onClick={() => handleScrollTo("information")}
              >
                Informações
              </Typography>
              <Typography
                variant="button"
                sx={{ color: "#757472", cursor: "pointer" }}
                onClick={() => handleScrollTo("confirmation")}
              >
                Confirmação
              </Typography>
              <Typography
                variant="button"
                sx={{ color: "#757472", cursor: "pointer" }}
                onClick={() => handleScrollTo("location")}
              >
                Localização
              </Typography>
            </Box>

            {/* Botão canto direito */}
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

        {/* Mobile BottomNavigation atualizado */}
        {isMobile && (
          <BottomNavigation
            value={value}
            onChange={handleChange}
            sx={{
              width: "100%",
              bgcolor: "#F6F2FB",
            }}
          >
            <BottomNavigationAction
              disableRipple
              label="Info"
              value="information"
              icon={<HelpIcon />}
              sx={{
                "&.Mui-selected": {
                  color: "#9A84B7",
                },
                "&:focus": {
                  outline: "none",
                },
              }}
            />
            <BottomNavigationAction
              disableRipple
              label="Presença"
              value="confirmation"
              icon={<HowToRegIcon />}
              sx={{
                "&.Mui-selected": {
                  color: "#9A84B7",
                },
                "&:focus": {
                  outline: "none",
                },
              }}
            />
            <BottomNavigationAction
              disableRipple
              label="Local"
              value="location"
              icon={<LocationOnIcon />}
              sx={{
                "&.Mui-selected": {
                  color: "#9A84B7",
                },
                "&:focus": {
                  outline: "none",
                },
              }}
            />
          </BottomNavigation>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default AppAppBar;