# Ben & Stephanie Wedding

## Current State
The backend stores RSVPs in a non-stable Map (`let rsvps = Map.empty<Nat, RSVP>()`), which means all RSVP data is wiped every time the canister is redeployed. The `nextRSVPId` counter is also non-stable. Images are imported as static assets and files exist in the project.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- Make `rsvps` map and `nextRSVPId` counter stable so data persists across deployments

### Remove
- Nothing

## Implementation Plan
1. Change `var nextRSVPId = 1` to `stable var nextRSVPId = 1`
2. Change `let rsvps = Map.empty<Nat, RSVP>()` to `stable let rsvps = Map.empty<Nat, RSVP>()`
3. No frontend changes needed
