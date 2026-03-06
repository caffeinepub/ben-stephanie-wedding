import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RSVP } from "../backend.d";
import { createActorWithConfig } from "../config";
import { getSecretParameter } from "../utils/urlParams";

/**
 * Fetches all RSVPs using a freshly-created admin-privileged actor.
 * Creates its own actor directly so there's no chicken-and-egg dependency.
 */
export function useAdminRSVPs() {
  return useQuery<RSVP[]>({
    queryKey: ["adminRSVPs"],
    queryFn: async () => {
      const actor = (await createActorWithConfig()) as any;
      const token = getSecretParameter("caffeineAdminToken") ?? "";
      await actor._initializeAccessControlWithSecret(token);
      return actor.getAllRSVPs();
    },
    retry: 2,
    retryDelay: 1000,
  });
}

/**
 * Deletes an RSVP by ID using a freshly-created admin-privileged actor.
 */
export function useAdminDeleteRSVP() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      const actor = (await createActorWithConfig()) as any;
      const token = getSecretParameter("caffeineAdminToken") ?? "";
      await actor._initializeAccessControlWithSecret(token);
      await actor.deleteRSVP(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminRSVPs"] });
    },
  });
}
