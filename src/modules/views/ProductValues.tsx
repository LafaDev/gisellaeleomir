import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "../components/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Snackbar from "../components/Snackbar";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";

// Example guest list
const initialGuests = ["Maria Silva", "Carlos Souza", "Fernanda Lima"];

// Type for guest status
type GuestStatus = "pending" | "going" | "notGoing";

// Type for button props
type MUIButtonProps = {
  variant: "text" | "outlined" | "contained";
  color:
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | "inherit";
  startIcon: React.ReactNode;
};

function ProductValues() {
  const [statuses, setStatuses] = useState<Record<string, GuestStatus>>({});

  // Snackbar state
  const [snackOpen, setSnackOpen] = useState(false);

  const toggleStatus = (name: string) => {
    setStatuses((prev) => {
      const current = prev[name] || "pending";
      let next: GuestStatus;

      if (current === "pending") next = "going";
      else if (current === "going") next = "notGoing";
      else next = "pending";

      return { ...prev, [name]: next };
    });
  };

  const getButtonProps = (status: GuestStatus): MUIButtonProps => {
    switch (status) {
      case "going":
        return {
          variant: "contained" as const,
          color: "success" as const,
          startIcon: <CheckIcon />,
        };
      case "notGoing":
        return {
          variant: "contained" as const,
          color: "error" as const,
          startIcon: <CloseIcon />,
        };
      default:
        return {
          variant: "outlined" as const,
          color: "inherit" as const,
          startIcon: <PersonIcon />,
        };
    }
  };

  const handleSnackOpen = () => setSnackOpen(true);
  const handleSnackClose = () => setSnackOpen(false);

  return (
    <Box
      id="confirmation"
      sx={{
        mb: { sx: 0, md: 2 },
        paddingTop: { sx: 0, md: 5 },
        transition: "transform 0.3s ease",
        transform: snackOpen ? "translateY(-60px)" : "translateY(0)", // efeito de deslizar para cima
      }}
    >
      <Box
        component="section"
        id="confirmationBackground"
        sx={{
          mt: { sx: 2 },
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          backgroundPosition: "center",
          py: { xs: 0.1, sm: 2, md: 8 },
        }}
      >
        {/* Card container */}
        <Box
          id="confirmationBox"
          sx={{
            bgcolor: "background.paper",
            borderRadius: 4,
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            p: { xs: 3, md: 5 },
            maxWidth: 600,
            width: "100%",
          }}
        >
          {/* Title */}
          <Typography
            variant="h3"
            align="center"
            sx={{
              fontFamily: "'Parisienne', cursive",
              mb: { xs: 4, sm: 4, md: 3 },
              fontWeight: "normal",
              color: "primary.main",
              textShadow: "1px 1px 4px rgba(0,0,0,0.15)",
            }}
          >
            Você foi escolhido para esse momento
          </Typography>

          {/* Guest buttons */}
          <Grid container spacing={3} direction="column" alignItems="center">
            {initialGuests.map((guest) => {
              const status = statuses[guest] || "pending";
              const buttonProps = getButtonProps(status);

              return (
                <Grid key={guest} sx={{ width: "100%" }}>
                  <Button
                    {...buttonProps}
                    onClick={() => toggleStatus(guest)}
                    sx={{
                      borderRadius: "50px",
                      px: 4,
                      py: 1.5,
                      textTransform: "none",
                      fontSize: 16,
                      width: "100%",
                      boxShadow: 2,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 4,
                      },
                      "&:focus": { outline: "none" },
                      ...(status === "pending" && {
                        bgcolor: "white",
                        color: "black",
                        border: "1px solid #ccc",
                        "&:hover": { bgcolor: "#f5f5f5" },
                      }),
                    }}
                  >
                    {guest}
                  </Button>
                </Grid>
              );
            })}
          </Grid>

          {/* Final confirm button */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: "50px",
                px: 2,
                py: 1.8,
                fontSize: 18,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: 3,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 6,
                },
                "&:focus": { outline: "none" },
              }}
              onClick={handleSnackOpen} // abrir Snackbar
            >
              Confirmar minha presença e de meus acompanhantes
            </Button>
          </Box>

          {/* Snackbar */}
          <Snackbar
            open={snackOpen}
            closeFunc={handleSnackClose}
            message="Presença confirmada!"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ProductValues;
