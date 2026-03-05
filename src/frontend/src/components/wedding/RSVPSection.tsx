import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CheckCircle2, Heart, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSubmitRSVP } from "../../hooks/useQueries";

export function RSVPSection() {
  const [partySize, setPartySize] = useState(1);
  const [guestNames, setGuestNames] = useState<string[]>([""]);
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutate: submitRSVP, isPending } = useSubmitRSVP();

  // Keep guestNames array in sync with partySize
  useEffect(() => {
    setGuestNames((prev) => {
      const next = [...prev];
      while (next.length < partySize) next.push("");
      return next.slice(0, partySize);
    });
  }, [partySize]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (guestNames.some((n) => !n.trim())) {
      toast.error("Please enter a name for every guest.");
      return;
    }
    if (!attending) {
      toast.error("Please let us know if you'll be attending.");
      return;
    }

    const combinedName = guestNames.map((n) => n.trim()).join(", ");

    submitRSVP(
      {
        guestName: combinedName,
        partySize: BigInt(partySize),
        attending: attending === "yes",
        mealPreference: "N/A",
        message: message.trim(),
      },
      {
        onSuccess: () => {
          setSubmitted(true);
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      },
    );
  }

  function resetForm() {
    setSubmitted(false);
    setPartySize(1);
    setGuestNames([""]);
    setAttending("");
    setMessage("");
  }

  return (
    <section
      data-ocid="rsvp.section"
      className="pt-8 md:pt-12 pb-24 md:pb-32 px-6 relative overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, oklch(var(--cream-dark)) 0%, oklch(var(--cream)) 50%, oklch(var(--cream-dark)) 100%)
        `,
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-10"
          style={{ background: "oklch(var(--sage-light))" }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: "oklch(var(--sunflower))" }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="font-script text-sage text-lg tracking-widest uppercase mb-3">
            Kindly Reply
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-[300] text-foreground mb-4">
            RSVP
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-sage/40" />
            <Heart className="w-4 h-4 text-sage fill-sage/30" />
            <div className="w-12 h-[1px] bg-sage/40" />
          </div>
          <p className="font-body-serif text-lg text-muted-foreground italic">
            Please respond by July 10th, 2026
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              data-ocid="rsvp.success_state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm border border-sage/20 rounded-3xl p-10 text-center shadow-petal"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
                className="w-20 h-20 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-sage" />
              </motion.div>
              <h3 className="font-display text-3xl font-[300] text-foreground mb-3">
                Thank You!
              </h3>
              <p className="font-body-serif text-lg text-muted-foreground italic mb-6">
                We've received your RSVP and can't wait to celebrate with you.
              </p>
              <Button
                variant="outline"
                className="border-sage/40 text-sage hover:bg-sage/10 font-sans rounded-full px-8"
                onClick={resetForm}
              >
                Submit Another RSVP
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm border border-sage/20 rounded-3xl p-8 md:p-10 shadow-petal"
            >
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Attending toggle */}
                <div className="space-y-2">
                  <Label className="font-sans text-sm font-semibold tracking-wide text-foreground/70 uppercase">
                    Will you attend?
                  </Label>
                  <ToggleGroup
                    type="single"
                    value={attending}
                    onValueChange={(val) =>
                      setAttending(val as "yes" | "no" | "")
                    }
                    className="justify-start gap-3"
                    data-ocid="rsvp.attending.toggle"
                  >
                    <ToggleGroupItem
                      value="yes"
                      className="rounded-full px-6 h-11 border border-sage/30 data-[state=on]:bg-sage data-[state=on]:text-white data-[state=on]:border-sage font-sans font-medium"
                    >
                      Joyfully accepts
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="no"
                      className="rounded-full px-6 h-11 border border-sage/30 data-[state=on]:bg-warm-brown data-[state=on]:text-white data-[state=on]:border-warm-brown font-sans font-medium"
                    >
                      Regretfully declines
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                {/* Number of guests */}
                <div className="space-y-2">
                  <Label
                    htmlFor="party-size"
                    className="font-sans text-sm font-semibold tracking-wide text-foreground/70 uppercase"
                  >
                    Number of Guests
                  </Label>
                  <Input
                    id="party-size"
                    data-ocid="rsvp.party_size.input"
                    type="number"
                    min={1}
                    max={10}
                    value={partySize}
                    onChange={(e) =>
                      setPartySize(
                        Math.max(1, Math.min(10, Number(e.target.value))),
                      )
                    }
                    className="border-sage/30 focus-visible:ring-sage bg-white/60 rounded-xl h-12 font-sans text-base w-32"
                  />
                </div>

                {/* Per-guest name fields */}
                <AnimatePresence>
                  <motion.div layout className="flex flex-col gap-3">
                    {guestNames.map((name, index) => (
                      <motion.div
                        // biome-ignore lint/suspicious/noArrayIndexKey: guest slot index is stable and positional
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-1 overflow-hidden"
                      >
                        <Label
                          htmlFor={`guest-name-${index}`}
                          className="font-sans text-sm font-semibold tracking-wide text-foreground/70 uppercase"
                        >
                          {partySize === 1
                            ? "Your Name"
                            : `Guest ${index + 1} Name`}
                        </Label>
                        <Input
                          id={`guest-name-${index}`}
                          data-ocid={`rsvp.guest_name.input.${index + 1}`}
                          placeholder={
                            index === 0
                              ? "Enter full name"
                              : `Enter guest ${index + 1} full name`
                          }
                          value={name}
                          onChange={(e) => {
                            const updated = [...guestNames];
                            updated[index] = e.target.value;
                            setGuestNames(updated);
                          }}
                          className="border-sage/30 focus-visible:ring-sage bg-white/60 rounded-xl h-12 font-sans text-base placeholder:text-muted-foreground/50"
                          autoComplete={index === 0 ? "name" : "off"}
                          required
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Message */}
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    className="font-sans text-sm font-semibold tracking-wide text-foreground/70 uppercase"
                  >
                    Message to the Couple
                    <span className="ml-1 text-muted-foreground font-normal normal-case tracking-normal">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="message"
                    data-ocid="rsvp.message.textarea"
                    placeholder="Share your well wishes or a special memory..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-sage/30 focus-visible:ring-sage bg-white/60 rounded-xl font-sans text-base min-h-[100px] placeholder:text-muted-foreground/50 resize-none"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  data-ocid="rsvp.submit_button"
                  disabled={isPending}
                  className="w-full h-13 rounded-full font-sans font-semibold text-base tracking-wide bg-sage hover:bg-sage-dark text-white shadow-petal mt-2 transition-all duration-300"
                  style={{ height: "52px" }}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send RSVP"
                  )}
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
