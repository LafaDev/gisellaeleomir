import { useEffect, useState } from "react";
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
import { authFetch } from "../../services/userAPI"; // <-- correct path to your authFetch

// Props interface
interface ProductValuesProps {
  guestName?: string; // from URL param (Home passes guestName)
}

type GuestStatus = "pending" | "going" | "notGoing";

interface Accompany {
  id: number;
  name: string;
  going: boolean;
  confirmed: boolean;
  guestId?: number;
}

interface Guest {
  id: number;
  name: string;
  tag: string;
  going: boolean;
  confirmed: boolean;
  accompany?: Accompany[];
}

function ProductValues({ guestName = "" }: ProductValuesProps) {
  const [guest, setGuest] = useState<Guest | null>(null);
  const [statuses, setStatuses] = useState<Record<string, GuestStatus>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [notFound, setNotFound] = useState(false); // <-- new state

  // Fetch guest + accompanies when we have a guestName (tag)
  useEffect(() => {
    if (!guestName) {
      setNotFound(true); // <-- if no guestName in URL, show message
      return;
    }

    let cancelled = false;
    const fetchGuest = async () => {
      try {
        const data = await authFetch(`/guest/${encodeURIComponent(guestName)}`);
        if (!data || cancelled) return;

        // if backend returns nothing or invalid guest
        if (!data.id) {
          setNotFound(true);
          return;
        }

        // Ensure data shape
        const fetched: Guest = {
          id: data.id,
          name: data.name,
          tag: data.tag,
          going: !!data.going,
          confirmed: !!data.confirmed,
          accompany: Array.isArray(data.accompany) ? data.accompany : [],
        };

        setGuest(fetched);

        // <-- SINCRONIZA ESTADO LOCAL COM O BANCO
        setConfirmed(fetched.confirmed);

        // initialize statuses. treat "going" when going === true or confirmed === true
        const initial: Record<string, GuestStatus> = {};
        initial[`guest-${fetched.id}`] = fetched.going || fetched.confirmed ? "going" : "pending";
        fetched.accompany!.forEach((a) => {
          initial[`accompany-${a.id}`] = a.going || a.confirmed ? "going" : "pending";
        });
        setStatuses(initial);
      } catch (err) {
        console.error("Failed to fetch guest:", err);
        setNotFound(true); // <-- if error, also mark as not found
      }
    };

    fetchGuest();
    return () => {
      cancelled = true;
    };
  }, [guestName]);

  const handleStatusChange = (key: string, status: GuestStatus) => {
    setStatuses((prev) => ({ ...prev, [key]: status }));
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setErrorMessage("");
  };

  const handleFinalConfirm = async () => {
    if (!guest) return;

    const allSelected = (() => {
      const guestKey = `guest-${guest.id}`;
      if (!statuses[guestKey] || statuses[guestKey] === "pending") return false;
      for (const a of guest.accompany || []) {
        const key = `accompany-${a.id}`;
        if (!statuses[key] || statuses[key] === "pending") return false;
      }
      return true;
    })();

    if (!allSelected) {
      setErrorMessage("Por favor, selecione a presença de todos os convidados.");
      return;
    }

    try {
      const guestKey = `guest-${guest.id}`;
      const guestStatus = statuses[guestKey];
      await authFetch(`/guest/${guest.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "guest",
          going: guestStatus === "going",
          confirmed: true,
        }),
      });

      for (const a of guest.accompany || []) {
        const key = `accompany-${a.id}`;
        const status = statuses[key];
        await authFetch(`/guest/${a.id}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "accompany",
            going: status === "going",
            confirmed: true,
          }),
        });
      }

      setConfirmed(true);
      handleDialogClose();
    } catch (err) {
      console.error("Failed to confirm:", err);
      setErrorMessage("Erro ao confirmar presença, tente novamente.");
    }
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
          {notFound ? (
            <Typography
              variant="h5"
              align="center"
              sx={{
                color: "#757472",
                fontFamily: "Cinzel",
                textShadow: "1px 1px 4px rgba(0,0,0,0.15)",
                fontSize: 22,
                fontWeight: "normal",
              }}
            >
              ACESSE O LINK FORNECIDO PELOS NOIVOS PARA CONFIRMAR SUA PRESENÇA
            </Typography>
          ) : (
            <>
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
                {guest ? `Você foi escolhido para esse momento` : "Você foi escolhido para esse momento"}
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
                    {guest && (
                      <>
                        {/* Guest row */}
                        {(() => {
                          const key = `guest-${guest.id}`;
                          const status = statuses[key] || "pending";
                          return (
                            <Grid key={key} sx={{ width: "100%" }}>
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
                                  onClick={() => handleStatusChange(key, "notGoing")}
                                  sx={{
                                    width: "20%",
                                    border: "none",
                                    backgroundColor: "#D94343",
                                    "&:hover": { backgroundColor: "#D94343" },
                                    "&.Mui-selected": { backgroundColor: "#D94343" },
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
                                    textDecoration: status === "notGoing" ? "line-through" : "none",
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
                                  {guest.name}
                                </Box>

                                <ToggleButton
                                  value="going"
                                  onClick={() => handleStatusChange(key, "going")}
                                  sx={{
                                    width: "20%",
                                    border: "none",
                                    backgroundColor: "#48A64C",
                                    "&:hover": { backgroundColor: "#48A64C" },
                                    "&.Mui-selected": { backgroundColor: "#48A64C" },
                                  }}
                                >
                                  <CheckIcon sx={{ color: "#fff" }} />
                                </ToggleButton>
                              </ToggleButtonGroup>
                            </Grid>
                          );
                        })()}

                        {/* Accompanies */}
                        {(guest.accompany || []).map((a) => {
                          const key = `accompany-${a.id}`;
                          const status = statuses[key] || "pending";
                          return (
                            <Grid key={key} sx={{ width: "100%" }}>
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
                                  onClick={() => handleStatusChange(key, "notGoing")}
                                  sx={{
                                    width: "20%",
                                    border: "none",
                                    backgroundColor: "#D94343",
                                    "&:hover": { backgroundColor: "#D94343" },
                                    "&.Mui-selected": { backgroundColor: "#D94343" },
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
                                    textDecoration: status === "notGoing" ? "line-through" : "none",
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
                                  {a.name}
                                </Box>

                                <ToggleButton
                                  value="going"
                                  onClick={() => handleStatusChange(key, "going")}
                                  sx={{
                                    width: "20%",
                                    border: "none",
                                    backgroundColor: "#48A64C",
                                    "&:hover": { backgroundColor: "#48A64C" },
                                    "&.Mui-selected": { backgroundColor: "#48A64C" },
                                  }}
                                >
                                  <CheckIcon sx={{ color: "#fff" }} />
                                </ToggleButton>
                              </ToggleButtonGroup>
                            </Grid>
                          );
                        })}
                      </>
                    )}
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
                      }}
                      startIcon={<CheckIcon />}
                    >
                      Confirmar presença
                    </Button>
                  </Box>
                </DialogContent>
              </Dialog>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductValues;
