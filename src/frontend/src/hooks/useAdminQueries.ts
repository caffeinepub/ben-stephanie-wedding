import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RSVP } from "../backend.d";
import { createActorWithConfig } from "../config";

const ADMIN_PASSCODE = "3762";
export const ADMIN_RSVPS_KEY = ["adminRSVPs"];

export function useAdminRSVPs() {
  return useQuery<RSVP[]>({
    queryKey: ADMIN_RSVPS_KEY,
    queryFn: async () => {
      const actor = await createActorWithConfig();
      const result = await (actor as any).getAllRSVPs(ADMIN_PASSCODE);
      return result;
    },
    staleTime: 0,
    retry: 3,
    retryDelay: 1500,
  });
}

export function useAdminDeleteRSVP() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      const actor = await createActorWithConfig();
      await (actor as any).deleteRSVP(id, ADMIN_PASSCODE);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_RSVPS_KEY });
    },
  });
}
