# Ben & Stephanie Wedding

## Current State
Backend uses `stable let rsvps = Map.empty<Nat, RSVP>()` which is not stable-compatible, causing data loss on every deployment. Admin panel subtitle shows "Loading..." permanently when the backend query fails, because the subtitle checks `rsvps ? count : "Loading..."` but `rsvps` stays `undefined` on error.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- Backend: replace `Map`-based RSVP storage with a `stable var` array so data persists across deployments
- AdminPanel.tsx: fix subtitle to show "0 responses" (or nothing) instead of "Loading..." when query has finished but returned no data

### Remove
- `Map` import and usage for RSVP storage

## Implementation Plan
1. Rewrite backend RSVP storage to use `stable var rsvpList : [RSVP] = []` with Array-based add/remove
2. Update `submitRSVP`, `getAllRSVPs`, `deleteRSVP` to work with the array
3. Fix AdminPanel.tsx subtitle: use `isLoading` state instead of truthiness of `rsvps` to determine loading text
