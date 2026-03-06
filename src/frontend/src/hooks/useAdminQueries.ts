import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RSVP } from "../backend.d";
import { useActor } from "./useActor";

/**
 * Fetches all RSVPs using the shared actor from useActor.
 * useActor already handles _initializeAccessControlWithSecret, so no
 * duplicate actor setup is needed here.
 */
export function useAdminRSVPs() {
  const { actor } = useActor();

  return useQuery<RSVP[]>({
    queryKey: ["adminRSVPs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRSVPs();
    },
  });
}

/**
 * Deletes an RSVP by ID using the shared actor.
 */
export function useAdminDeleteRSVP() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Backend not ready. Please try again.");
      await actor.deleteRSVP(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminRSVPs"] });
    },
  });
}
