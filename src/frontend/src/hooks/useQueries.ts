import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RSVP, WeddingDetails } from "../backend.d";
import { createActorWithConfig } from "../config";
import { getSecretParameter } from "../utils/urlParams";

// ─── Wedding Details ─────────────────────────────────────────────────────────

export function useWeddingDetails() {
  return useQuery<WeddingDetails>({
    queryKey: ["weddingDetails"],
    queryFn: async () => {
      const actor = await createActorWithConfig();
      return actor.getWeddingDetails();
    },
    // Fallback to static values if backend fails
    placeholderData: {
      venue: "Civvy",
      date: "21st August 2026",
      time: "From 7PM",
      description:
        "Join us at the Civvy to celebrate us becoming Mr and Mrs Mitchell.",
      address: "11 St Leonard's Bank, Perth PH2 8EB",
    },
    retry: 2,
  });
}

export function useUpdateWeddingDetails() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (details: WeddingDetails) => {
      const actor = await createActorWithConfig();
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

export interface SubmitRSVPParams {
  guestName: string;
  partySize: bigint;
  attending: boolean;
  mealPreference: string;
  message: string;
}

export function useSubmitRSVP() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: SubmitRSVPParams) => {
      const actor = await createActorWithConfig();
      return actor.submitRSVP(
        params.guestName,
        params.partySize,
        params.attending,
        params.mealPreference,
        params.message,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminRSVPs"] });
    },
  });
}

// ─── Admin ───────────────────────────────────────────────────────────────────

async function createAdminActor() {
  const actor = await createActorWithConfig();
  const adminToken = getSecretParameter("caffeineAdminToken") ?? "";
  // biome-ignore lint/suspicious/noExplicitAny: runtime method not in generated types
  await (actor as any)._initializeAccessControlWithSecret(adminToken);
  return actor;
}

export function useAdminRSVPs() {
  return useQuery<RSVP[]>({
    queryKey: ["adminRSVPs"],
    queryFn: async () => {
      const actor = await createAdminActor();
      return actor.getAllRSVPs();
    },
    retry: 3,
    retryDelay: 1500,
  });
}

export function useAdminDeleteRSVP() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      const actor = await createAdminActor();
      await actor.deleteRSVP(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminRSVPs"] });
    },
  });
}
