import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RSVP } from "../backend.d";
import { createActorWithConfig } from "../config";

export const ADMIN_RSVPS_KEY = ["adminRSVPs"];

export function useAdminRSVPs() {
  return useQuery<RSVP[]>({
    queryKey: ADMIN_RSVPS_KEY,
    queryFn: async () => {
      const actor = await createActorWithConfig();
      const result = await actor.getAllRSVPs();
      return result;
    },
    staleTime: 0,
    retry: 1,
    retryDelay: 1000,
  });
}

export function useAdminDeleteRSVP() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      const actor = await createActorWithConfig();
      await actor.deleteRSVP(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_RSVPS_KEY });
    },
  });
}
