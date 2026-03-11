import { DetailsSection } from "../components/wedding/DetailsSection";
import { FooterSection } from "../components/wedding/FooterSection";
import { HeroSection } from "../components/wedding/HeroSection";
import { RSVPSection } from "../components/wedding/RSVPSection";
import { useWeddingDetails } from "../hooks/useQueries";

export function WeddingPage() {
  const { data: details, isLoading } = useWeddingDetails();

  return (
    <main className="min-h-screen">
      <HeroSection />
      <DetailsSection details={details} isLoading={isLoading} />
      <RSVPSection />
      <FooterSection />
    </main>
  );
}
