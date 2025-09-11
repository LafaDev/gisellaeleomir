import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "../components/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// Props interface
interface ProductValuesProps {
  guestName?: string;
}

// Guest list
const initialGuests = ["Maria Silva", "Carlos Souza", "Fernanda Lima"];

// Guest status
type GuestStatus = "pending" | "going" | "notGoing";

function ProductValues({ guestName }: ProductValuesProps) {
  const [statuses, setStatuses] = useState<Record<string, GuestStatus>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleStatusChange = (guest: string, status: GuestStatus) => {
    setStatuses((prev) => ({ ...prev, [guest]: status }));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setErrorMessage("");
  };

  const handleFinalConfirm = () => {
    const allSelected = initialGuests.every(
      (guest) => statuses[guest] && statuses[guest] !== "pending"
    );

    if (!allSelected) {
      setErrorMessage("Por favor, selecione a presença de todos os convidados.");
      return;
    }

    setConfirmed(true);
    handleDialogClose();
  };

  return (
    <Box id="confirmation" sx={{ paddingTop: { sx: 5, md: 5 } }}>
      <br /> <br />
      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          py: { xs: 0.1, sm: 2, md: 8 },
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            borderRadius: 4,
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            p: { xs: 3, md: 5 },
            maxWidth: 600,
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            align="center"
            sx={{
              color: "#757472",
              fontFamily: "Cinzel",
              fontSize: 29,
              mb: { xs: 4, sm: 4, md: 3 },
              fontWeight: "normal",
              textShadow: "1px 1px 4px rgba(0,0,0,0.15)",
            }}
          >
            {/* Você foi escolhido para esse momento */}
            {guestName ? `${guestName}, Você foi escolhido para esse momento` : "Você foi escolhido para esse momento"}
          </Typography>

          <Typography
            align="center"
            sx={{
              fontFamily: "Quicksand, sans-serif",
              mb: 2,
              fontSize: "1.1rem",
              color: confirmed ? "#48A64C" : "text.primary",
              fontWeight: confirmed ? "bold" : "normal",
            }}
          >
            {confirmed
              ? "Sua presença foi confirmada"
              : "Confirme aqui com antecedência sua presença, pois a entrada será somente com o nome na lista."}
          </Typography>

          {!confirmed && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <ArrowDownwardIcon sx={{ fontSize: 30, color: "#9A84B7" }} />
            </Box>
          )}

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: confirmed ? "#48A64C" : "#9A84B7",
                borderRadius: "50px",
                px: 2,
                py: 1.8,
                fontSize: 18,
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: 3,
                "&:focus": { outline: "none" },
                "&:hover": {
                  backgroundColor: confirmed ? "#48A64C" : "#9A84B7",
                },
              }}
              onClick={confirmed ? undefined : () => setDialogOpen(true)}
            >
              {confirmed ? <CheckIcon /> : "Confirmar minha presença e de meus acompanhantes"}
            </Button>
          </Box>

          <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ textAlign: "center" }}>Selecione os convidados</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} direction="column" alignItems="center">
                {initialGuests.map((guest) => {
                  const status = statuses[guest] || "pending";

                  return (
                    <Grid key={guest} sx={{ width: "100%" }}>
                      <ToggleButtonGroup
                        exclusive
                        value={status}
                        sx={{
                          width: "100%",
                          borderRadius: "50px",
                          overflow: "hidden",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                        }}
                      >
                        <ToggleButton
                          value="notGoing"
                          onClick={() => handleStatusChange(guest, "notGoing")}
                          sx={{
                            width: "20%",
                            border: "none",
                            backgroundColor: "#D94343",
                            "&:hover": { backgroundColor: "#D94343" },
                            "&.Mui-selected": { backgroundColor: "#D94343" },
                            "&.Mui-selected:hover": { backgroundColor: "#D94343" },
                            "&:focus": { outline: "none" },
                            "&:active": { transform: "none" },
                          }}
                        >
                          <CloseIcon sx={{ color: "#fff" }} />
                        </ToggleButton>

                        <Box
                          sx={{
                            width: "70%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            textDecoration: status === "notGoing" ? 'line-through' : 'none',
                            backgroundColor:
                              status === "going"
                                ? "#48A64C"
                                : status === "notGoing"
                                ? "#D94343"
                                : "#f5f5f5",
                            color: status !== "pending" ? "#fff" : "#000",
                            fontWeight: "bold",
                          }}
                        >
                          {guest}
                        </Box>

                        <ToggleButton
                          value="going"
                          onClick={() => handleStatusChange(guest, "going")}
                          sx={{
                            width: "20%",
                            border: "none",
                            backgroundColor: "#48A64C",
                            "&:hover": { backgroundColor: "#48A64C" },
                            "&.Mui-selected": { backgroundColor: "#48A64C" },
                            "&.Mui-selected:hover": { backgroundColor: "#48A64C" },
                            "&:focus": { outline: "none" },
                            "&:active": { transform: "none" },
                          }}
                        >
                          <CheckIcon sx={{ color: "#fff" }} />
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Grid>
                  );
                })}
              </Grid>

              {errorMessage && (
                <Typography color="error" align="center" sx={{ mt: 2, fontSize: "0.95rem" }}>
                  {errorMessage}
                </Typography>
              )}

              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleFinalConfirm}
                  sx={{
                    backgroundColor: "#9A84B7",
                    borderRadius: "50px",
                    px: 3,
                    py: 1.5,
                    fontSize: 16,
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:focus": { outline: "none" },
                  }}
                  startIcon={<CheckIcon />}
                >
                  Confirmar presença
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductValues;
