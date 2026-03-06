import { useQuery } from "@tanstack/react-query";
import type { backendInterface } from "../backend";
import { createActorWithConfig } from "../config";

/**
 * Creates and caches a simple anonymous (unauthenticated) actor.
 * Used for public operations like submitting an RSVP that do not require login.
 * The actor is created once on mount and cached indefinitely.
 */
export function useAnonActor() {
  const query = useQuery<backendInterface>({
    queryKey: ["anonActor"],
    queryFn: () => createActorWithConfig(),
    staleTime: Number.POSITIVE_INFINITY,
    retry: 3,
    retryDelay: 1000,
  });

  return {
    anonActor: query.data ?? null,
    isReady: !!query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
