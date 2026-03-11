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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, LogOut, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useAdminDeleteRSVP, useAdminRSVPs } from "../../hooks/useAdminQueries";

interface AdminPanelProps {
  onLogout?: () => void;
}

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const { data: rsvps, isLoading: rsvpsLoading } = useAdminRSVPs();
  const { mutate: deleteRSVP, isPending: deletingId } = useAdminDeleteRSVP();

  function formatDate(submittedAt: bigint) {
    const ms = Number(submittedAt) / 1_000_000;
    return new Date(ms).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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

        {/* RSVP Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-sm border border-sage/20 rounded-2xl overflow-hidden shadow-card"
        >
          <div className="px-6 py-5 border-b border-sage/10">
            <h2 className="font-display text-2xl font-[300] text-foreground">
              Guest RSVPs
            </h2>
            <p className="font-sans text-sm text-muted-foreground mt-0.5">
              {rsvps
                ? `${rsvps.length} response${rsvps.length !== 1 ? "s" : ""}`
                : "Loading..."}
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table data-ocid="admin.rsvp.table">
              <TableHeader>
                <TableRow className="border-sage/10 hover:bg-transparent">
                  <TableHead className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                    Guest
                  </TableHead>
                  <TableHead className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                    Party
                  </TableHead>
                  <TableHead className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                    Attending
                  </TableHead>
                  <TableHead className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                    Message
                  </TableHead>
                  <TableHead className="font-sans text-xs tracking-widest uppercase text-muted-foreground">
                    Date
                  </TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rsvpsLoading ? (
                  ["r1", "r2", "r3"].map((rowId) => (
                    <TableRow key={rowId} className="border-sage/10">
                      {["c1", "c2", "c3", "c4", "c5", "c6"].map((colId) => (
                        <TableCell key={colId}>
                          <Skeleton className="h-4 w-full bg-sage/10" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : !rsvps || rsvps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div
                        data-ocid="admin.rsvp.empty_state"
                        className="text-center py-12"
                      >
                        <p className="font-body-serif text-lg text-muted-foreground italic">
                          No RSVPs yet. Share the wedding website with your
                          guests!
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  rsvps.map((rsvp, idx) => (
                    <TableRow
                      key={String(rsvp.id)}
                      className="border-sage/10 hover:bg-sage/3"
                    >
                      <TableCell className="font-sans font-medium text-foreground">
                        {rsvp.guestName}
                      </TableCell>
                      <TableCell className="font-sans text-muted-foreground">
                        {String(rsvp.partySize)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            rsvp.attending
                              ? "bg-sage/15 text-sage-dark border-sage/30 font-sans"
                              : "bg-blush/20 text-warm-brown border-blush/30 font-sans"
                          }
                          variant="outline"
                        >
                          {rsvp.attending ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-sans text-muted-foreground max-w-[200px] truncate">
                        {rsvp.message || "—"}
                      </TableCell>
                      <TableCell className="font-sans text-muted-foreground text-sm">
                        {formatDate(rsvp.submittedAt)}
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              data-ocid={`admin.rsvp.delete_button.${idx + 1}`}
                              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="font-sans">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="font-display font-[400]">
                                Delete RSVP?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently remove {rsvp.guestName}'s
                                RSVP. This action cannot be undone.
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
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
