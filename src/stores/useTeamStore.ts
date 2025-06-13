import { create } from "zustand";

interface TeamState {
  teamName: string;
  teamProfileUrl: string;
  teamProfileFile: File | null;
  setTeamName: (name: string) => void;
  setTeamProfileFile: (file: File | null) => void;
  setTeamProfileUrl: (url: string) => void;
}

export const useTeamStore = create<TeamState>((set) => ({
  teamName: "",
  teamProfileUrl: "",
  teamProfileFile: null,
  setTeamName: (name) => set({ teamName: name }),
  setTeamProfileUrl: (url) => set({ teamProfileUrl: url }),
  setTeamProfileFile: (file) => set({ teamProfileFile: file }),
}));
