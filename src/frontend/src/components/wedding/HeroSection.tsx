import { Heart } from "lucide-react";
import { motion } from "motion/react";

// Static sunflower SVG - 12 petals, pre-computed positions (no array map)
function SunflowerAccent({
  size = 40,
  opacity = 0.6,
}: {
  size?: number;
  opacity?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
      role="presentation"
    >
      {/* 12 petals at 30° intervals */}
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
      {/* Center */}
      <circle cx="30" cy="30" r="10" fill="oklch(0.4 0.05 60)" />
      <circle cx="30" cy="30" r="7" fill="oklch(0.35 0.06 55)" />
    </svg>
  );
}

export function HeroSection() {
  return (
    <section
      data-ocid="hero.section"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.87 0.04 130 / 0.35) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 80%, oklch(0.82 0.18 85 / 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 50% 40% at 10% 70%, oklch(0.88 0.05 20 / 0.15) 0%, transparent 50%),
          oklch(var(--cream))
        `,
      }}
    >
      {/* Hero background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/assets/generated/wedding-hero.dim_1600x900.jpg"
          alt="Wedding garden"
          className="w-full h-full object-cover opacity-20"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      {/* Decorative floating dots */}
      <motion.div
        className="absolute top-16 left-12 w-3 h-3 rounded-full bg-sage/30"
        animate={{ y: [-8, 8, -8], x: [-3, 3, -3] }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-32 right-20 w-2 h-2 rounded-full bg-sunflower/50"
        animate={{ y: [8, -8, 8], x: [3, -3, 3] }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-40 left-24 w-4 h-4 rounded-full bg-blush/30"
        animate={{ y: [-6, 6, -6] }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-20 right-1/3 w-2 h-2 rounded-full bg-sage-light/40"
        animate={{ y: [4, -10, 4] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      {/* Extra sunflower floating dots */}
      <motion.div
        className="absolute top-1/3 left-8 w-3 h-3 rounded-full bg-sunflower/40"
        animate={{ y: [-10, 6, -10], x: [2, -4, 2] }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-10 w-2 h-2 rounded-full bg-sunflower/50"
        animate={{ y: [6, -8, 6] }}
        transition={{
          duration: 6.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 3,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-1.5 h-1.5 rounded-full bg-sunflower/35"
        animate={{ y: [-5, 9, -5], x: [-2, 4, -2] }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.8,
        }}
      />

      {/* Decorative sunflower SVGs in corners */}
      <motion.div
        className="absolute top-10 left-6 pointer-events-none"
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ rotate: [0, 5, -3, 0] }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <SunflowerAccent size={48} opacity={0.5} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-16 right-8 pointer-events-none"
        initial={{ opacity: 0, scale: 0.6, rotate: 20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
      >
        <motion.div
          animate={{ rotate: [0, -6, 4, 0] }}
          transition={{
            duration: 14,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <SunflowerAccent size={36} opacity={0.4} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 1.3, ease: "easeOut" }}
      >
        <motion.div
          animate={{ rotate: [0, 8, -4, 0] }}
          transition={{
            duration: 11,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <SunflowerAccent size={44} opacity={0.45} />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-24 right-12 pointer-events-none"
        initial={{ opacity: 0, scale: 0.6, rotate: 15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
      >
        <motion.div
          animate={{ rotate: [0, -5, 7, 0] }}
          transition={{
            duration: 13,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <SunflowerAccent size={32} opacity={0.38} />
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center max-w-5xl">
        {/* Couple photo with passcode badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          {/* Sunflower yellow glow behind circle */}
          <div
            className="absolute inset-0 rounded-full -z-10"
            style={{
              background:
                "radial-gradient(circle, oklch(0.82 0.18 85 / 0.28) 0%, transparent 70%)",
              transform: "scale(1.4)",
            }}
          />
          <div className="w-44 h-44 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white/80 shadow-[0_0_0_8px_oklch(0.87_0.04_130/0.25),0_8px_40px_oklch(0.28_0.04_60/0.2)]">
            <img
              src="/assets/uploads/0-1.jpg"
              alt="Ben and Stephanie"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Animated heart badge */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-sunflower flex items-center justify-center shadow-petal"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Heart className="w-5 h-5 text-warm-brown fill-warm-brown" />
          </motion.div>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <p className="font-script text-xl md:text-2xl text-sage-dark tracking-widest uppercase mb-1">
            Together with their families
          </p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-[300] text-foreground leading-none tracking-tight">
            Ben <span className="text-sage-dark">&amp;</span> Stephanie
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-sage-dark/60" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-sage-dark/60" />
          <h2 className="font-body-serif text-xl md:text-2xl text-muted-foreground px-10 md:px-20 italic leading-relaxed">
            We'd Love You to Celebrate With Us
          </h2>
        </motion.div>

        {/* CTA scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col items-center gap-2 mt-4"
        >
          <p className="font-sans text-sm text-muted-foreground tracking-widest uppercase">
            Scroll to discover
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-[1px] h-10 bg-gradient-to-b from-sage-dark/60 to-transparent"
          />
        </motion.div>
      </div>

      {/* Bottom decorative divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <img
          src="/assets/generated/botanical-divider-transparent.dim_800x150.png"
          alt=""
          className="w-full h-24 object-cover object-top opacity-60"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60" />
      </div>
    </section>
  );
}
