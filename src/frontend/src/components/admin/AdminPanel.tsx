import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { AlertCircle, Loader2, LogOut, RefreshCw, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  ADMIN_RSVPS_KEY,
  useAdminDeleteRSVP,
  useAdminRSVPs,
} from "../../hooks/useAdminQueries";

interface AdminPanelProps {
  onLogout?: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const {
    data: rsvps,
    isLoading: rsvpsLoading,
    isError,
    error,
  } = useAdminRSVPs();
  const { mutate: deleteRSVP, isPending: deletingId } = useAdminDeleteRSVP();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  async function handleRefresh() {
    setRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ADMIN_RSVPS_KEY });
    setRefreshing(false);
  }

  function formatDate(submittedAt: bigint) {
    const ms = Number(submittedAt) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const rsvpList = rsvps ?? [];

  function getSubtitle() {
    if (rsvpsLoading) return "Loading...";
    if (isError) return "Could not load responses";
    return `${rsvpList.length} response${rsvpList.length !== 1 ? "s" : ""}`;
  }

  return (
    <div
      data-ocid="admin.panel"
      className="min-h-screen py-8 px-4 md:px-8"
      style={{ background: "oklch(var(--cream))" }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-[300] text-foreground">
              Admin Panel
            </h1>
            <p className="font-sans text-sm text-muted-foreground mt-1">
              Ben &amp; Stephanie · Wedding Management
            </p>
          </div>
          <Button
            variant="outline"
            data-ocid="admin.logout_button"
            onClick={() => onLogout?.()}
            className="border-sage/30 text-sage-dark hover:bg-sage/10 font-sans rounded-full gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* RSVPs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Section header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-2xl font-[300] text-foreground">
                Guest RSVPs
              </h2>
              <p className="font-sans text-sm text-muted-foreground mt-0.5">
                {getSubtitle()}
              </p>
            </div>
            <Button
              variant="outline"
              data-ocid="admin.rsvp.secondary_button"
              onClick={handleRefresh}
              disabled={refreshing || rsvpsLoading}
              className="border-sage/30 text-sage-dark hover:bg-sage/10 font-sans rounded-full gap-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>

          {/* Loading skeletons */}
          {rsvpsLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="bg-white/80 border border-sage/20 rounded-2xl p-5 shadow-sm"
                >
                  <Skeleton className="h-5 w-2/3 mb-3 bg-sage/10" />
                  <Skeleton className="h-6 w-1/3 mb-4 bg-sage/10 rounded-full" />
                  <Skeleton className="h-4 w-full mb-2 bg-sage/10" />
                  <Skeleton className="h-4 w-4/5 mb-4 bg-sage/10" />
                  <Skeleton className="h-3 w-1/4 bg-sage/10" />
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {!rsvpsLoading && isError && (
            <div
              data-ocid="admin.rsvp.error_state"
              className="bg-white/80 border border-red-200 rounded-2xl p-10 text-center shadow-sm"
            >
              <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <p className="font-sans text-sm font-semibold text-red-600 mb-1">
                Failed to load RSVPs
              </p>
              <p className="font-sans text-xs text-muted-foreground mb-4">
                {error instanceof Error
                  ? error.message
                  : "An unexpected error occurred. Please try refreshing."}
              </p>
              <Button
                variant="outline"
                onClick={handleRefresh}
                className="border-sage/30 text-sage-dark hover:bg-sage/10 font-sans rounded-full gap-2 text-sm"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Try Again
              </Button>
            </div>
          )}

          {/* Empty state */}
          {!rsvpsLoading && !isError && rsvpList.length === 0 && (
            <div
              data-ocid="admin.rsvp.empty_state"
              className="bg-white/80 border border-sage/20 rounded-2xl p-16 text-center shadow-sm"
            >
              <p className="font-body-serif text-lg text-muted-foreground italic">
                No RSVPs yet. Share the wedding website with your guests!
              </p>
            </div>
          )}

          {/* Card grid */}
          {!rsvpsLoading && !isError && rsvpList.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {rsvpList.map((rsvp, idx) => (
                  <motion.div
                    key={String(rsvp.id)}
                    data-ocid={`admin.rsvp.item.${idx + 1}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                    className="relative bg-white/90 border border-sage/25 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-sage/40 transition-all duration-200 flex flex-col"
                  >
                    {/* Delete button */}
                    <div className="absolute top-3 right-3">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            data-ocid={`admin.rsvp.delete_button.${idx + 1}`}
                            className="w-8 h-8 text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 rounded-lg"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="font-sans">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="font-display font-[400]">
                              Delete RSVP?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove {rsvp.guestName}
                              &apos;s RSVP. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel
                              data-ocid="admin.rsvp.cancel_button"
                              className="font-sans rounded-full"
                            >
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              data-ocid="admin.rsvp.confirm_button"
                              onClick={() =>
                                deleteRSVP(rsvp.id, {
                                  onError: () =>
                                    toast.error("Failed to delete RSVP."),
                                  onSuccess: () =>
                                    toast.success("RSVP deleted."),
                                })
                              }
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-sans rounded-full"
                            >
                              {deletingId ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Delete"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    {/* Guest name */}
                    <h3 className="font-display text-xl font-[300] text-foreground pr-8 mb-3 leading-tight">
                      {rsvp.guestName}
                    </h3>

                    {/* Attending badge */}
                    <div className="mb-4">
                      {rsvp.attending ? (
                        <Badge
                          variant="outline"
                          className="bg-sage/15 text-sage-dark border-sage/40 font-sans text-xs px-3 py-1 rounded-full"
                        >
                          ✓ Yes I will be there
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-800 border-amber-200 font-sans text-xs px-3 py-1 rounded-full"
                        >
                          ✗ Sorry I can&apos;t make it
                        </Badge>
                      )}
                    </div>

                    {/* Optional message */}
                    {rsvp.message && String(rsvp.message).trim() !== "" && (
                      <p className="font-body-serif italic text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
                        &ldquo;{String(rsvp.message)}&rdquo;
                      </p>
                    )}

                    {/* Date footer */}
                    <div className="border-t border-sage/15 pt-3 mt-auto">
                      <span className="font-sans text-xs text-muted-foreground/70">
                        {formatDate(rsvp.submittedAt)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
