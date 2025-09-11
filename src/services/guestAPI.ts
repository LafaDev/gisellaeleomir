import { authFetch } from "./userAPI";

export type Accompany = {
  id: number;
  name: string;
  going: boolean;
  confirmed: boolean;
};

export type Guest = {
  id: number;
  name: string;
  tag: string;
  going: boolean;
  confirmed: boolean;
  accompany?: Accompany[];
};

export const getAllGuests = async (): Promise<Guest[]> => {
  return authFetch("/guest");
};

// ------------------ Guest ------------------
export const createGuest = async (name: string, tag: string) => {
  if (!name.trim() || !tag.trim()) {
    throw new Error("Nome e tag são obrigatórios");
  }

  return authFetch("/guest", {
    method: "POST",
    body: JSON.stringify({
      name,
      tag,
      going: false,       // required by backend
      confirmed: false,   // required by backend
    }),
  });
};

export const updateGuest = async (id: number, name: string, tag: string) => {
  if (!name.trim() || !tag.trim()) {
    throw new Error("Nome e tag são obrigatórios");
  }

  return authFetch(`/guest/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name, tag }),
  });
};

export const deleteGuest = async (id: number) => {
  return authFetch(`/guest/${id}`, { method: "DELETE" });
};

// ------------------ Accompany ------------------
export const createAccompany = async (guestId: number, name: string) => {
  if (!name.trim()) {
    throw new Error("Nome do acompanhante é obrigatório");
  }

  return authFetch(`/guest/${guestId}/accompany`, {
    method: "POST",
    body: JSON.stringify({
      name,
      going: false,       // required by backend
      confirmed: false,   // required by backend
      guestId,            // required by backend
    }),
  });
};

export const updateAccompany = async (guestId: number, accompanyId: number, name: string) => {
  if (!name.trim()) {
    throw new Error("Nome do acompanhante é obrigatório");
  }

  return authFetch(`/guest/${guestId}/accompany/${accompanyId}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
};

export const deleteAccompany = async (id: number) => {
  return authFetch(`/guest/accompany/${id}`, { method: "DELETE" });
};

// ------------------ Status ------------------
export const updateStatus = async (
  id: number,
  type: "guest" | "accompany",
  field: "going" | "confirmed",
  value: boolean
) => {
  return authFetch(`/guest/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ type, [field]: value }),
  });
};
