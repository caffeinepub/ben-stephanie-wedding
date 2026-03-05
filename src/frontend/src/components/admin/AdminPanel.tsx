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
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Check,
  Loader2,
  LogOut,
  Trash2,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import type { WeddingDetails } from "../../backend.d";
import {
  useAllRSVPs,
  useDeleteRSVP,
  useUpdateWeddingDetails,
  useWeddingDetails,
} from "../../hooks/useQueries";
import type { StorageClient } from "../../utils/StorageClient";

interface AdminPanelProps {
  storageClient?: StorageClient | null;
  onLogout?: () => void;
}

export function AdminPanel({ storageClient, onLogout }: AdminPanelProps) {
  const { data: rsvps, isLoading: rsvpsLoading } = useAllRSVPs();
  const { data: details, isLoading: detailsLoading } = useWeddingDetails();
  const { mutate: deleteRSVP, isPending: deletingId } = useDeleteRSVP();
  const { mutate: updateDetails, isPending: updatingDetails } =
    useUpdateWeddingDetails();

  // Details form state
  const [detailsForm, setDetailsForm] = useState<WeddingDetails | null>(null);
  const [detailsSaved, setDetailsSaved] = useState(false);

  // Photo upload state
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoProgress, setPhotoProgress] = useState(0);
  const [photoHash, setPhotoHash] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form from details when loaded
  const currentDetails: WeddingDetails = detailsForm ||
    details || {
      date: "",
      time: "",
      venue: "",
      address: "",
      description: "",
    };

  function handleDetailsChange(key: keyof WeddingDetails, value: string) {
    setDetailsForm({ ...currentDetails, [key]: value });
    setDetailsSaved(false);
  }

  function handleDetailsSave(e: React.FormEvent) {
    e.preventDefault();
    updateDetails(currentDetails, {
      onSuccess: () => {
        setDetailsSaved(true);
        toast.success("Wedding details updated!");
        setTimeout(() => setDetailsSaved(false), 2000);
      },
      onError: () => {
        toast.error("Failed to update details. Please try again.");
      },
    });
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!storageClient) {
      toast.error("Storage not available. Please try again later.");
      return;
    }

    setPhotoUploading(true);
    setPhotoProgress(0);

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { hash } = await storageClient.putFile(bytes, (pct) => {
        setPhotoProgress(pct);
      });
      setPhotoHash(hash);
      toast.success("Photo uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload photo. Please try again.");
    } finally {
      setPhotoUploading(false);
    }
  }

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
                    Meal
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
                      {["c1", "c2", "c3", "c4", "c5", "c6", "c7"].map(
                        (colId) => (
                          <TableCell key={colId}>
                            <Skeleton className="h-4 w-full bg-sage/10" />
                          </TableCell>
                        ),
                      )}
                    </TableRow>
                  ))
                ) : !rsvps || rsvps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>
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
                      <TableCell className="font-sans text-muted-foreground">
                        {rsvp.mealPreference}
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

        {/* Bottom grid: Details + Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Edit Wedding Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm border border-sage/20 rounded-2xl p-6 shadow-card"
          >
            <h2 className="font-display text-2xl font-[300] text-foreground mb-6">
              Wedding Details
            </h2>

            {detailsLoading ? (
              <div className="space-y-4">
                {["f1", "f2"].map((id) => (
                  <Skeleton key={id} className="h-10 w-full bg-sage/10" />
                ))}
              </div>
            ) : (
              <form onSubmit={handleDetailsSave} className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="details-description"
                    className="font-sans text-xs font-semibold tracking-widest uppercase text-foreground/60"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="details-description"
                    value={currentDetails.description}
                    onChange={(e) =>
                      handleDetailsChange("description", e.target.value)
                    }
                    placeholder="A short description for your guests..."
                    className="border-sage/30 focus-visible:ring-sage bg-white/60 rounded-xl font-sans min-h-[80px] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  data-ocid="admin.details.save_button"
                  disabled={updatingDetails}
                  className={`w-full rounded-full font-sans font-semibold gap-2 transition-all duration-300 ${
                    detailsSaved
                      ? "bg-sage text-white"
                      : "bg-sage hover:bg-sage-dark text-white"
                  }`}
                >
                  {updatingDetails ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : detailsSaved ? (
                    <Check className="w-4 h-4" />
                  ) : null}
                  {updatingDetails
                    ? "Saving..."
                    : detailsSaved
                      ? "Saved!"
                      : "Save Details"}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Photo Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm border border-sage/20 rounded-2xl p-6 shadow-card"
          >
            <h2 className="font-display text-2xl font-[300] text-foreground mb-2">
              Couple Photo
            </h2>
            <p className="font-sans text-sm text-muted-foreground mb-6">
              Upload your favourite photo to display on the wedding website.
            </p>

            <div className="space-y-4">
              {/* Upload area */}
              <button
                type="button"
                className={`relative w-full border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 hover:border-sage hover:bg-sage/5 ${
                  photoUploading ? "border-sage bg-sage/5" : "border-sage/30"
                }`}
                onClick={() => !photoUploading && fileInputRef.current?.click()}
                disabled={photoUploading}
                data-ocid="admin.photo.dropzone"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handlePhotoUpload}
                  disabled={photoUploading}
                />

                {photoUploading ? (
                  <div className="space-y-3">
                    <Loader2 className="w-8 h-8 text-sage animate-spin mx-auto" />
                    <p className="font-sans text-sm text-sage">
                      Uploading... {photoProgress}%
                    </p>
                    <div className="w-full bg-sage/10 rounded-full h-1.5">
                      <div
                        className="bg-sage h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${photoProgress}%` }}
                      />
                    </div>
                  </div>
                ) : photoHash ? (
                  <div className="space-y-2">
                    <Check className="w-8 h-8 text-sage mx-auto" />
                    <p className="font-sans text-sm text-sage font-medium">
                      Photo uploaded!
                    </p>
                    <p className="font-sans text-xs text-muted-foreground font-mono break-all">
                      {photoHash.substring(0, 40)}...
                    </p>
                    <button
                      type="button"
                      className="font-sans text-xs text-sage underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhotoHash(null);
                      }}
                    >
                      Upload different photo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-sage/50 mx-auto" />
                    <p className="font-sans text-sm text-muted-foreground">
                      Click to upload your couple photo
                    </p>
                    <p className="font-sans text-xs text-muted-foreground/60">
                      JPG, PNG, WEBP up to 10MB
                    </p>
                  </div>
                )}
              </button>

              <Button
                type="button"
                data-ocid="admin.photo.upload_button"
                onClick={() => fileInputRef.current?.click()}
                disabled={photoUploading || !storageClient}
                variant="outline"
                className="w-full border-sage/30 text-sage hover:bg-sage/10 font-sans rounded-full gap-2"
              >
                <Upload className="w-4 h-4" />
                {photoUploading ? "Uploading..." : "Choose Photo"}
              </Button>

              {!storageClient && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <AlertCircle className="w-3 h-3" />
                  <span>
                    Storage unavailable — photo upload requires authentication
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
