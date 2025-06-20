import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Team = {
  name: string;
  image?: string | null;
  id: number;
};

type TeamStore = {
  currentTeam: Team | null;
  setCurrentTeam: (team: Team | null) => void;
};

export const useTeamStore = create<TeamStore>()(
  persist(
    (set) => ({
      currentTeam: null,
      setCurrentTeam: (team) => set({ currentTeam: team }),
    }),
    {
      name: "team-store",
      partialize: (state) => ({ currentTeam: state.currentTeam }),
    },
  ),
);
