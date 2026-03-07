import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RSVP } from "../backend.d";
import { useAdminActor } from "./useAdminActor";

/**
 * Fetches all RSVPs using the admin-privileged actor.
 * getAllRSVPs is restricted to admin callers on the backend, so we must use
 * the actor that has been initialized with the Caffeine admin token.
 */
export function useAdminRSVPs() {
  const { adminActor, isLoading: actorLoading } = useAdminActor();

  const query = useQuery<RSVP[]>({
    queryKey: ["adminRSVPs"],
    queryFn: async () => {
      if (!adminActor) throw new Error("Admin actor not ready");
      return adminActor.getAllRSVPs();
    },
    enabled: !!adminActor,
    retry: 3,
    retryDelay: 1500,
  });

  return {
    ...query,
    // Show loading while the actor itself is still initializing
    isLoading: actorLoading || query.isLoading,
  };
}

/**
 * Deletes an RSVP by ID using the admin-privileged actor.
 */
export function useAdminDeleteRSVP() {
  const { adminActor } = useAdminActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!adminActor) throw new Error("Admin actor not ready");
      await adminActor.deleteRSVP(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminRSVPs"] });
    },
  });
}
