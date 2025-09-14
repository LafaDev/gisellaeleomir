import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import type { GridColDef, GridRowHeightParams, GridRowHeightReturnValue } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import * as GuestAPI from "../services/guestAPI";

export default function Panel() {
  const [guests, setGuests] = useState<GuestAPI.Guest[]>([]);

  const [guestDialogOpen, setGuestDialogOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestTag, setGuestTag] = useState("");
  const [guestGoing, setGuestGoing] = useState(false);
  const [guestConfirmed, setGuestConfirmed] = useState(false);
  const [editGuestId, setEditGuestId] = useState<number | null>(null);

  const [accompanyDialogOpen, setAccompanyDialogOpen] = useState(false);
  const [accompanyName, setAccompanyName] = useState("");
  const [accompanyGoing, setAccompanyGoing] = useState(false);
  const [accompanyConfirmed, setAccompanyConfirmed] = useState(false);
  const [currentGuestId, setCurrentGuestId] = useState<number | null>(null);
  const [editAccompanyId, setEditAccompanyId] = useState<number | null>(null);

  /** ------------------ Fetch Guests ------------------ */
  const fetchGuests = async () => {
    try {
      const data = await GuestAPI.getAllGuests();
      setGuests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  /** ------------------ Guest Dialog ------------------ */
  const openGuestDialog = (guest?: GuestAPI.Guest) => {
    if (guest) {
      setGuestName(guest.name);
      setGuestTag(guest.tag);
      setGuestGoing(guest.going);
      setGuestConfirmed(guest.confirmed);
      setEditGuestId(guest.id);
    } else {
      setGuestName("");
      setGuestTag("");
      setGuestGoing(false);
      setGuestConfirmed(false);
      setEditGuestId(null);
    }
    setGuestDialogOpen(true);
  };

  const saveGuest = async () => {
    if (!guestName.trim() || !guestTag.trim()) {
      alert("Nome e tag são obrigatórios");
      return;
    }

    try {
      if (editGuestId !== null) {
        await GuestAPI.updateGuest(editGuestId, guestName, guestTag);
        if (guestConfirmed) {
          await GuestAPI.updateGoingStatus(editGuestId, "guest", guestGoing);
        }
      } else {
        await GuestAPI.createGuest(guestName, guestTag);
      }
      fetchGuests();
      setGuestDialogOpen(false);
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
    }
  };

  const deleteGuest = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este convidado?")) return;
    try {
      await GuestAPI.deleteGuest(id);
      fetchGuests();
    } catch (err) {
      console.error(err);
    }
  };

  /** ------------------ Accompany Dialog ------------------ */
  const openAccompanyDialog = (guestId: number, accompany?: GuestAPI.Accompany) => {
    setCurrentGuestId(guestId);
    if (accompany) {
      setAccompanyName(accompany.name);
      setAccompanyGoing(accompany.going);
      setAccompanyConfirmed(accompany.confirmed);
      setEditAccompanyId(accompany.id);
    } else {
      setAccompanyName("");
      setAccompanyGoing(false);
      setAccompanyConfirmed(false);
      setEditAccompanyId(null);
    }
    setAccompanyDialogOpen(true);
  };

  const saveAccompany = async () => {
    if (!accompanyName.trim() || currentGuestId === null) {
      alert("Nome do acompanhante é obrigatório");
      return;
    }

    try {
      if (editAccompanyId !== null) {
        await GuestAPI.updateAccompany(currentGuestId, editAccompanyId, accompanyName);
        if (accompanyConfirmed) {
          await GuestAPI.updateGoingStatus(editAccompanyId, "accompany", accompanyGoing);
        }
      } else {
        await GuestAPI.createAccompany(currentGuestId, accompanyName);
      }
      fetchGuests();
      setAccompanyDialogOpen(false);
    } catch (err) {
      console.error(err);
      alert((err as Error).message);
    }
  };

  const deleteAccompany = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este acompanhante?")) return;
    try {
      await GuestAPI.deleteAccompany(id);
      fetchGuests();
    } catch (err) {
      console.error(err);
    }
  };

  /** ------------------ Copy Link ------------------ */
  const copyGuestLink = (tag: string) => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/${tag}`).then(() => alert("Link copiado!"));
  };

  /** ------------------ Counters ------------------ */
  const totalGuests = guests.length;
  const totalInvited = guests.length + guests.reduce((acc, g) => acc + (g.accompany?.length || 0), 0);
  const totalConfirmedGoing = guests.reduce(
    (acc, g) => acc + (g.confirmed && g.going ? 1 : 0) + (g.accompany?.filter((a) => a.confirmed && a.going).length || 0),
    0
  );
  const totalNotConfirmed = guests.reduce(
    (acc, g) => acc + (!g.confirmed ? 1 : 0) + (g.accompany?.filter((a) => !a.confirmed).length || 0),
    0
  );
  const totalConfirmedNotGoing = guests.reduce(
    (acc, g) => acc + (g.confirmed && !g.going ? 1 : 0) + (g.accompany?.filter((a) => a.confirmed && !a.going).length || 0),
    0
  );

  /** ------------------ DataGrid Columns ------------------ */
  const columns: GridColDef[] = [
    { field: "name", headerName: "Nome", width: 200 },
    {
      field: "tag",
      headerName: "Tag",
      width: 200,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography>{params.value}</Typography>
          <IconButton size="small" onClick={() => copyGuestLink(params.value)}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "going",
      headerName: "Vai?",
      width: 100,
      renderCell: (params) => {
        const canToggle = params.row.confirmed;
        return (
          <IconButton
            onClick={() =>
              canToggle &&
              GuestAPI.updateGoingStatus(params.row.id, "guest", !params.row.going).then(fetchGuests)
            }
            disabled={!canToggle}
          >
            {params.value ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
          </IconButton>
        );
      },
    },
    {
      field: "confirmed",
      headerName: "Confirmado?",
      width: 130,
      renderCell: (params) => (
        <IconButton>
          {params.value ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
        </IconButton>
      ),
    },
    {
      field: "accompany",
      headerName: "Acompanhantes",
      width: 300,
      renderCell: (params) => {
        const accompanies: GuestAPI.Accompany[] = params.row.accompany || [];
        return (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {accompanies.map((a) => {
              const canToggle = a.confirmed;
              return (
                <Box key={a.id} sx={{ display: "flex", alignItems: "center", mb: 0.5, flexWrap: "wrap" }}>
                  <Typography sx={{ mr: 1 }}>{a.name}</Typography>
                  <IconButton
                    size="small"
                    onClick={() =>
                      canToggle &&
                      GuestAPI.updateGoingStatus(a.id, "accompany", !a.going).then(fetchGuests)
                    }
                    disabled={!canToggle}
                  >
                    {a.going ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
                  </IconButton>
                  <IconButton size="small" onClick={() => openAccompanyDialog(params.row.id, a)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => deleteAccompany(a.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 180,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton onClick={() => openGuestDialog(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => deleteGuest(params.row.id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={() => openAccompanyDialog(params.row.id)}>
            <PersonAddIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const getRowHeight = (params: GridRowHeightParams): GridRowHeightReturnValue => {
    const baseHeight = 52;
    const extraHeight = (params.model.accompany?.length || 0) * 38;
    return baseHeight + extraHeight;
  };

  /** ------------------ JSX ------------------ */
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Painel de convidados
      </Typography>

      {/* Counters */}
      <Box sx={{ display: "flex", gap: 4, mb: 2, flexWrap: "wrap" }}>
        <Paper sx={{ p: 1, minWidth: 150 }} elevation={2}>
          <Typography>Total de convidados: {totalGuests}</Typography>
        </Paper>
        <Paper sx={{ p: 1, minWidth: 150 }} elevation={2}>
          <Typography>Total convidados + acompanhantes: {totalInvited}</Typography>
        </Paper>
        <Paper sx={{ p: 1, minWidth: 150 }} elevation={2}>
          <Typography>Total confirmados e vão: {totalConfirmedGoing}</Typography>
        </Paper>
        <Paper sx={{ p: 1, minWidth: 150 }} elevation={2}>
          <Typography>Total não confirmados: {totalNotConfirmed}</Typography>
        </Paper>
        <Paper sx={{ p: 1, minWidth: 150 }} elevation={2}>
          <Typography>Total confirmados mas não vão: {totalConfirmedNotGoing}</Typography>
        </Paper>
      </Box>

      <Button variant="contained" sx={{ mb: 2 }} onClick={() => openGuestDialog()}>
        Adicionar convidado
      </Button>

      <div style={{ height: "auto", width: "100%" }}>
        <DataGrid
          autoHeight
          getRowHeight={getRowHeight}
          rows={guests.map((g) => ({ ...g, id: g.id }))}
          columns={columns}
          pagination
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10, page: 0 } } }}
        />
      </div>

      {/* Guest Dialog */}
      <Dialog open={guestDialogOpen} onClose={() => setGuestDialogOpen(false)}>
        <DialogTitle>{editGuestId !== null ? "Editar convidado" : "Novo convidado"}</DialogTitle>
        <DialogContent>
          <TextField label="Nome" fullWidth sx={{ my: 1 }} value={guestName} onChange={(e) => setGuestName(e.target.value)} />
          <TextField label="Tag" fullWidth sx={{ my: 1 }} value={guestTag} onChange={(e) => setGuestTag(e.target.value)} />
          {editGuestId !== null && guestConfirmed && (
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="guest-going-label">Vai?</InputLabel>
              <Select labelId="guest-going-label" value={guestGoing ? "true" : "false"} onChange={(e) => setGuestGoing(e.target.value === "true")}>
                <MenuItem value="true">Sim</MenuItem>
                <MenuItem value="false">Não</MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGuestDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={saveGuest}>Salvar</Button>
        </DialogActions>
      </Dialog>

      {/* Accompany Dialog */}
      <Dialog open={accompanyDialogOpen} onClose={() => setAccompanyDialogOpen(false)}>
        <DialogTitle>{editAccompanyId !== null ? "Editar acompanhante" : "Novo acompanhante"}</DialogTitle>
        <DialogContent>
          <TextField label="Nome" fullWidth sx={{ my: 1 }} value={accompanyName} onChange={(e) => setAccompanyName(e.target.value)} />
          {editAccompanyId !== null && accompanyConfirmed && (
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="accompany-going-label">Vai?</InputLabel>
              <Select labelId="accompany-going-label" value={accompanyGoing ? "true" : "false"} onChange={(e) => setAccompanyGoing(e.target.value === "true")}>
                <MenuItem value="true">Sim</MenuItem>
                <MenuItem value="false">Não</MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAccompanyDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={saveAccompany}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
