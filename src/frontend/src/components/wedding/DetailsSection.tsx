import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, MapPin, MapPinned } from "lucide-react";
import { motion } from "motion/react";
import type { WeddingDetails } from "../../backend.d";

interface DetailsSectionProps {
  details?: WeddingDetails;
  isLoading?: boolean;
}

const detailItems = [
  {
    icon: Calendar,
    label: "Date",
    value: "21st August 2026",
  },
  {
    icon: Clock,
    label: "Time",
    value: "From 7PM",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: "Civvy",
  },
  {
    icon: MapPinned,
    label: "Address",
    value: "11 St Leonard's Bank, Perth PH2 8EB",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export function DetailsSection({ details, isLoading }: DetailsSectionProps) {
  return (
    <section
      data-ocid="details.section"
      className="pt-24 md:pt-32 pb-8 md:pb-12 px-6 relative overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, oklch(var(--cream)) 0%, oklch(var(--cream-dark)) 100%)
        `,
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-64 h-64 opacity-15"
          style={{
            background:
              "radial-gradient(circle, oklch(var(--sage-light)) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 opacity-15"
          style={{
            background:
              "radial-gradient(circle, oklch(var(--sunflower)) 0%, transparent 70%)",
          }}
        />
        {/* Sunflower accents */}
        <div className="absolute top-8 right-12 opacity-20">
          <svg
            width="52"
            height="52"
            viewBox="0 0 60 60"
            fill="none"
            aria-hidden="true"
            role="presentation"
          >
            <ellipse
              cx="46"
              cy="30"
              rx="5"
              ry="8"
              transform="rotate(0, 46, 30)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="43.928"
              cy="38"
              rx="5"
              ry="8"
              transform="rotate(30, 43.928, 38)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="38"
              cy="43.928"
              rx="5"
              ry="8"
              transform="rotate(60, 38, 43.928)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="30"
              cy="46"
              rx="5"
              ry="8"
              transform="rotate(90, 30, 46)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="22"
              cy="43.928"
              rx="5"
              ry="8"
              transform="rotate(120, 22, 43.928)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="16.072"
              cy="38"
              rx="5"
              ry="8"
              transform="rotate(150, 16.072, 38)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="14"
              cy="30"
              rx="5"
              ry="8"
              transform="rotate(180, 14, 30)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="16.072"
              cy="22"
              rx="5"
              ry="8"
              transform="rotate(210, 16.072, 22)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="22"
              cy="16.072"
              rx="5"
              ry="8"
              transform="rotate(240, 22, 16.072)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="30"
              cy="14"
              rx="5"
              ry="8"
              transform="rotate(270, 30, 14)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="38"
              cy="16.072"
              rx="5"
              ry="8"
              transform="rotate(300, 38, 16.072)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="43.928"
              cy="22"
              rx="5"
              ry="8"
              transform="rotate(330, 43.928, 22)"
              fill="oklch(0.82 0.18 85)"
            />
            <circle cx="30" cy="30" r="10" fill="oklch(0.4 0.05 60)" />
          </svg>
        </div>
        <div className="absolute bottom-12 left-8 opacity-15">
          <svg
            width="40"
            height="40"
            viewBox="0 0 60 60"
            fill="none"
            aria-hidden="true"
            role="presentation"
          >
            <ellipse
              cx="46"
              cy="30"
              rx="5"
              ry="8"
              transform="rotate(0, 46, 30)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="43.928"
              cy="38"
              rx="5"
              ry="8"
              transform="rotate(30, 43.928, 38)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="38"
              cy="43.928"
              rx="5"
              ry="8"
              transform="rotate(60, 38, 43.928)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="30"
              cy="46"
              rx="5"
              ry="8"
              transform="rotate(90, 30, 46)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="22"
              cy="43.928"
              rx="5"
              ry="8"
              transform="rotate(120, 22, 43.928)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="16.072"
              cy="38"
              rx="5"
              ry="8"
              transform="rotate(150, 16.072, 38)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="14"
              cy="30"
              rx="5"
              ry="8"
              transform="rotate(180, 14, 30)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="16.072"
              cy="22"
              rx="5"
              ry="8"
              transform="rotate(210, 16.072, 22)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="22"
              cy="16.072"
              rx="5"
              ry="8"
              transform="rotate(240, 22, 16.072)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="30"
              cy="14"
              rx="5"
              ry="8"
              transform="rotate(270, 30, 14)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="38"
              cy="16.072"
              rx="5"
              ry="8"
              transform="rotate(300, 38, 16.072)"
              fill="oklch(0.82 0.18 85)"
            />
            <ellipse
              cx="43.928"
              cy="22"
              rx="5"
              ry="8"
              transform="rotate(330, 43.928, 22)"
              fill="oklch(0.82 0.18 85)"
            />
            <circle cx="30" cy="30" r="10" fill="oklch(0.4 0.05 60)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-script text-sage text-lg md:text-xl tracking-widest uppercase mb-3">
            The Details
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-[300] text-foreground mb-6">
            Evening Celebration
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-[1px] bg-sage/40" />
            <div className="w-2 h-2 rounded-full bg-sunflower" />
            <div className="w-16 h-[1px] bg-sage/40" />
          </div>

          <p className="font-body-serif text-base md:text-lg text-muted-foreground mt-6 max-w-xl mx-auto leading-relaxed italic">
            You are warmly invited to join us for the evening celebration.
          </p>

          {isLoading ? (
            <div className="mt-6 flex flex-col items-center gap-2">
              <Skeleton className="h-4 w-72 bg-sage/10" />
              <Skeleton className="h-4 w-60 bg-sage/10" />
            </div>
          ) : details?.description ? (
            <p className="font-body-serif text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed italic">
              {details.description}
            </p>
          ) : null}
        </motion.div>

        {/* Detail cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {detailItems.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="group relative bg-white/70 backdrop-blur-sm border border-sage/20 rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
            >
              {/* Hover accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-sage/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10 flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-sage/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-sage-dark" />
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold tracking-widest uppercase text-sage mb-1">
                    {label}
                  </p>
                  <p className="font-display text-xl font-[400] text-foreground">
                    {value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative bottom element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <img
            src="/assets/generated/botanical-divider-transparent.dim_800x150.png"
            alt=""
            className="h-16 w-auto opacity-40"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
