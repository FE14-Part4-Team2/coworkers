import { create } from "zustand";

type TeamStore = {
  currentTeam: string | null;
  setCurrentTeam: (teamName: string | null) => void;
};

export const useTeamStore = create<TeamStore>((set) => ({
  currentTeam: null,
  setCurrentTeam: (teamName) => set({ currentTeam: teamName }),
}));
