import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RSVP, WeddingDetails } from "../backend.d";
import { useActor } from "./useActor";

// ─── Wedding Details ─────────────────────────────────────────────────────────

export function useWeddingDetails() {
  const { actor, isFetching } = useActor();
  return useQuery<WeddingDetails>({
    queryKey: ["weddingDetails"],
    queryFn: async () => {
      if (!actor) {
        return {
          venue: "Civvy",
          date: "12th August 2026",
          time: "From 7PM",
          description:
            "Join us at the Civvy to celebrate us becoming Mr and Mrs Mitchell.",
          address: "11 St Leonard's Bank, Perth PH2 8EB",
        };
      }
      return actor.getWeddingDetails();
    },
    enabled: !isFetching,
  });
}

export function useUpdateWeddingDetails() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (details: WeddingDetails) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.updateWeddingDetails(
        details.date,
        details.time,
        details.venue,
        details.address,
        details.description,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["weddingDetails"] });
    },
  });
}

// ─── RSVP ────────────────────────────────────────────────────────────────────

export function useAllRSVPs() {
  const { actor, isFetching } = useActor();
  return useQuery<RSVP[]>({
    queryKey: ["allRSVPs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRSVPs();
    },
    enabled: !!actor && !isFetching,
  });
}

export interface SubmitRSVPParams {
  guestName: string;
  partySize: bigint;
  attending: boolean;
  mealPreference: string;
  message: string;
}

export function useSubmitRSVP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: SubmitRSVPParams) => {
      if (!actor) throw new Error("Could not connect to backend");
      return actor.submitRSVP(
        params.guestName,
        params.partySize,
        params.attending,
        params.mealPreference,
        params.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRSVPs"] });
    },
  });
}

export function useDeleteRSVP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not authenticated");
      await actor.deleteRSVP(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRSVPs"] });
    },
  });
}

// ─── Admin ───────────────────────────────────────────────────────────────────

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
