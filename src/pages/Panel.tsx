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
} from "@mui/material";
import type { GridColDef, GridRowHeightParams, GridRowHeightReturnValue } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // <-- new icon

import * as GuestAPI from "../services/guestAPI";

export default function Panel() {
  const [guests, setGuests] = useState<GuestAPI.Guest[]>([]);

  // Guest Dialog
  const [guestDialogOpen, setGuestDialogOpen] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestTag, setGuestTag] = useState("");
  const [editGuestId, setEditGuestId] = useState<number | null>(null);

  // Accompany Dialog
  const [accompanyDialogOpen, setAccompanyDialogOpen] = useState(false);
  const [accompanyName, setAccompanyName] = useState("");
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

  /** ------------------ Guest Handlers ------------------ */
  const openGuestDialog = (guest?: GuestAPI.Guest) => {
    if (guest) {
      setGuestName(guest.name);
      setGuestTag(guest.tag);
      setEditGuestId(guest.id);
    } else {
      setGuestName("");
      setGuestTag("");
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

  /** ------------------ Accompany Handlers ------------------ */
  const openAccompanyDialog = (guestId: number, accompany?: GuestAPI.Accompany) => {
    setCurrentGuestId(guestId);
    if (accompany) {
      setAccompanyName(accompany.name);
      setEditAccompanyId(accompany.id);
    } else {
      setAccompanyName("");
      setEditAccompanyId(null);
    }
    setAccompanyDialogOpen(true);
  };

  const saveAccompany = async () => {
    if (!accompanyName.trim()) {
      alert("Nome do acompanhante é obrigatório");
      return;
    }

    if (currentGuestId === null) return;

    try {
      if (editAccompanyId !== null) {
        await GuestAPI.updateAccompany(currentGuestId, editAccompanyId, accompanyName);
      } else {
        await GuestAPI.createAccompany(currentGuestId, accompanyName);
      }
      await fetchGuests();
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

  /** ------------------ Status Update ------------------ */
  const toggleStatus = async (
    id: number,
    type: "guest" | "accompany",
    field: "going" | "confirmed",
    value: boolean
  ) => {
    try {
      await GuestAPI.updateStatus(id, type, field, value);
      fetchGuests();
    } catch (err) {
      console.error(err);
    }
  };

  /** ------------------ Copy Link ------------------ */
  const copyGuestLink = (tag: string) => {
    const baseUrl = window.location.origin; // e.g. http://localhost:5173
    const url = `${baseUrl}/${tag}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("Link copiado!");
    });
  };

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
      renderCell: (params) => (
        <IconButton
          onClick={() => toggleStatus(params.row.id, "guest", "going", !params.row.going)}
        >
          {params.value ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
        </IconButton>
      ),
    },
    {
      field: "confirmed",
      headerName: "Confirmado?",
      width: 130,
      renderCell: (params) => (
        <IconButton
          onClick={() =>
            toggleStatus(params.row.id, "guest", "confirmed", !params.row.confirmed)
          }
        >
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
            {accompanies.map((a) => (
              <Box
                key={a.id}
                sx={{ display: "flex", alignItems: "center", mb: 0.5, flexWrap: "wrap" }}
              >
                <Typography sx={{ mr: 1 }}>{a.name}</Typography>
                <IconButton
                  size="small"
                  onClick={() => toggleStatus(a.id, "accompany", "going", !a.going)}
                >
                  {a.going ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() =>
                    toggleStatus(a.id, "accompany", "confirmed", !a.confirmed)
                  }
                >
                  {a.confirmed ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
                </IconButton>
                <IconButton size="small" onClick={() => openAccompanyDialog(params.row.id, a)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => deleteAccompany(a.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
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

  /** ------------------ Dynamic Row Height ------------------ */
  const getRowHeight = (params: GridRowHeightParams): GridRowHeightReturnValue => {
    const baseHeight = 52;
    const extraHeight = (params.model.accompany?.length || 0) * 38;
    return baseHeight + extraHeight;
  };

  /** ------------------ Count confirmed guests ------------------ */
  const confirmedCount = guests.reduce(
    (acc, g) => acc + (g.confirmed ? 1 : 0) + (g.accompany?.filter((a) => a.confirmed).length || 0),
    0
  );

  /** ------------------ Render ------------------ */
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Painel de convidados
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Total de convidados confirmados: {confirmedCount}
      </Typography>

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

      {/* ------------------ Guest Dialog ------------------ */}
      <Dialog open={guestDialogOpen} onClose={() => setGuestDialogOpen(false)}>
        <DialogTitle>{editGuestId !== null ? "Editar convidado" : "Novo convidado"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            sx={{ my: 1 }}
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
          <TextField
            label="Tag"
            fullWidth
            sx={{ my: 1 }}
            value={guestTag}
            onChange={(e) => setGuestTag(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setGuestDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={saveGuest}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ------------------ Accompany Dialog ------------------ */}
      <Dialog open={accompanyDialogOpen} onClose={() => setAccompanyDialogOpen(false)}>
        <DialogTitle>{editAccompanyId !== null ? "Editar acompanhante" : "Novo acompanhante"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            sx={{ my: 1 }}
            value={accompanyName}
            onChange={(e) => setAccompanyName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAccompanyDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={saveAccompany}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
