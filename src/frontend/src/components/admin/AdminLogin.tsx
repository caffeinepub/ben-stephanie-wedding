import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface AdminLoginProps {
  onSuccess: () => void;
}

const PASSCODE = "3762";

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (passcode === PASSCODE) {
      localStorage.setItem("admin_passcode_auth", "true");
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setPasscode("");
      setTimeout(() => setShake(false), 500);
    }
  }

  function handleChange(value: string) {
    // Allow only digits, max 4
    const digits = value.replace(/\D/g, "").slice(0, 4);
    setPasscode(digits);
    if (error) setError(false);
    // Auto-submit when 4 digits entered
    if (digits.length === 4) {
      if (digits === PASSCODE) {
        localStorage.setItem("admin_passcode_auth", "true");
        onSuccess();
      } else {
        setError(true);
        setShake(true);
        setPasscode("");
        setTimeout(() => setShake(false), 500);
      }
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "oklch(var(--cream))" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm text-center"
      >
        <div className="bg-white/80 backdrop-blur-sm border border-sage/20 rounded-3xl p-10 shadow-petal">
          {/* Lock icon with sunflower accent */}
          <div className="relative w-16 h-16 rounded-2xl bg-sage/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-7 h-7 text-sage-dark" />
            <div
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "oklch(0.82 0.18 85)" }}
            >
              <span
                className="text-[8px] font-bold"
                style={{ color: "oklch(0.28 0.04 60)" }}
              >
                ✿
              </span>
            </div>
          </div>

          <h1 className="font-display text-3xl font-[300] text-foreground mb-2">
            Admin Access
          </h1>
          <p className="font-body-serif text-lg text-muted-foreground italic mb-8">
            Ben &amp; Stephanie's Wedding
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <p className="font-sans text-sm text-muted-foreground">
                Enter the 4-digit passcode
              </p>
              <motion.div
                animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <Input
                  data-ocid="admin.passcode.input"
                  type="password"
                  inputMode="numeric"
                  placeholder="••••"
                  value={passcode}
                  onChange={(e) => handleChange(e.target.value)}
                  maxLength={4}
                  autoFocus
                  className={`text-center text-2xl tracking-[0.5em] h-14 rounded-2xl border-sage/30 focus-visible:ring-sage-dark bg-white/60 font-sans placeholder:tracking-[0.5em] ${
                    error
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                />
              </motion.div>
              {error && (
                <motion.p
                  data-ocid="admin.passcode.error_state"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-sans text-sm text-destructive"
                >
                  Incorrect passcode. Please try again.
                </motion.p>
              )}
            </div>

            {/* PIN dots indicator */}
            <div className="flex justify-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${passcode.length > 0 ? "bg-sage-dark scale-110" : "bg-sage/20"}`}
              />
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${passcode.length > 1 ? "bg-sage-dark scale-110" : "bg-sage/20"}`}
              />
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${passcode.length > 2 ? "bg-sage-dark scale-110" : "bg-sage/20"}`}
              />
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${passcode.length > 3 ? "bg-sage-dark scale-110" : "bg-sage/20"}`}
              />
            </div>

            <Button
              data-ocid="admin.passcode.submit_button"
              type="submit"
              disabled={passcode.length !== 4}
              className="w-full h-12 rounded-full font-sans font-semibold bg-sage-dark hover:bg-sage-dark/90 text-white shadow-petal disabled:opacity-40"
            >
              Enter
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
