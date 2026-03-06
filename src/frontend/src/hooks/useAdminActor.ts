import { useQuery } from "@tanstack/react-query";
import type { backendInterface } from "../backend";
import { createActorWithConfig } from "../config";
import { getSecretParameter } from "../utils/urlParams";

// The backend supports _initializeAccessControlWithSecret at runtime even
// though it isn't listed in the generated type declaration.
type AdminBackendInterface = backendInterface & {
  _initializeAccessControlWithSecret(token: string): Promise<void>;
};

/**
 * Creates and caches an admin-privileged actor by calling
 * _initializeAccessControlWithSecret with the Caffeine admin token.
 * This bypasses the Internet Identity requirement for admin operations.
 */
export function useAdminActor() {
  const query = useQuery<AdminBackendInterface>({
    queryKey: ["adminActor"],
    queryFn: async () => {
      const actor = (await createActorWithConfig()) as AdminBackendInterface;
      const adminToken = getSecretParameter("caffeineAdminToken") ?? "";
      await actor._initializeAccessControlWithSecret(adminToken);
      return actor;
    },
    staleTime: Number.POSITIVE_INFINITY,
    retry: 2,
  });

  return {
    adminActor: query.data ?? null,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}
