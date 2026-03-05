# Ben & Stephanie Wedding

## Current State
- Full wedding website with HeroSection (circle photo placeholder), DetailsSection, RSVPSection, FooterSection
- Admin area uses Internet Identity login (blockchain-based)
- Sage green color: oklch(0.6 0.09 145) throughout CSS variables and components
- Circle image at top of HeroSection uses a generated placeholder image
- No couple photo displayed yet
- Sunflower accents exist but are subtle

## Requested Changes (Diff)

### Add
- Couple's photo (0.jpg / /assets/uploads/0-1.jpg) displayed in the circle image near the top of the HeroSection, replacing the placeholder
- More prominent sunflower decorative elements throughout the page (more sunflower SVG icons/accents in HeroSection, DetailsSection, FooterSection)
- Simple passcode-based admin login (passcode: 3762) replacing the Internet Identity login flow in AdminPage and AdminLogin

### Modify
- Sage green color token updated from oklch(0.6 0.09 145) to match hex #d6ddb9 — convert to OKLCH and update all CSS variable references in index.css and any hardcoded oklch values in components
- AdminLogin component: replace Internet Identity "Sign In" button with a passcode input form (4-digit PIN entry) that checks against "3762", storing auth state in localStorage
- AdminPage: check localStorage passcode auth instead of Internet Identity
- WeddingPage: remove the couplePhotoUrl prop dependency — hardcode /assets/uploads/0-1.jpg directly in HeroSection

### Remove
- Internet Identity login dependency from admin flow (AdminLogin and AdminPage)
- useInternetIdentity hook usage in AdminPage
- Couple photo placeholder logic (replace with real photo)

## Implementation Plan
1. Convert #d6ddb9 to OKLCH and update all sage color tokens in index.css
2. Update HeroSection to use /assets/uploads/0-1.jpg directly in the circle
3. Replace AdminLogin with passcode form (4-digit input, checks "3762", saves to localStorage)
4. Replace AdminPage auth logic to use localStorage passcode flag instead of Internet Identity
5. Add more sunflower decorative elements (SVG sunflower icons or larger/more frequent accents) in HeroSection and other sections
6. Fix any hardcoded oklch sage values in component files to use updated token
