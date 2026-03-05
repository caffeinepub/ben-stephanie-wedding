import { Heart } from "lucide-react";

// Reusable static sunflower SVG (no array map)
function SmallSunflower({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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
  );
}

export function FooterSection() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="py-12 px-6 text-center border-t border-sage/10 bg-cream-dark relative overflow-hidden">
      {/* Sunflower decorative accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-4 left-6 opacity-15">
          <SmallSunflower size={36} />
        </div>
        <div className="absolute bottom-4 right-6 opacity-15">
          <SmallSunflower size={36} />
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Sunflower dots row */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-sunflower/50" />
          <div className="w-2 h-2 rounded-full bg-sunflower/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-sunflower/50" />
        </div>
        <p className="font-script text-sage-dark text-2xl mb-2">
          Ben &amp; Stephanie
        </p>
        <p className="font-sans text-xs text-muted-foreground tracking-widest uppercase mb-6">
          Forever begins · June 14, 2025
        </p>
        <div className="w-16 h-[1px] bg-sage/30 mx-auto mb-6" />
        <p className="font-sans text-xs text-muted-foreground">
          © {year}.{" "}
          <span className="inline-flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-blush fill-blush" /> using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sage-dark hover:text-sage-dark/80 underline underline-offset-2 transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
