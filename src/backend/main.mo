import Array "mo:base/Array";
import Time "mo:base/Time";
import Map "mo:core/Map";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Principal "mo:core/Principal";

actor {
  type WeddingDetails = {
    date : Text;
    time : Text;
    venue : Text;
    address : Text;
    description : Text;
  };

  type RSVP = {
    id : Nat;
    guestName : Text;
    partySize : Nat;
    attending : Bool;
    mealPreference : Text;
    message : Text;
    submittedAt : Int;
  };

  type UserProfile = {
    name : Text;
  };

  // Required for blob-storage mixin upgrade compatibility
  include MixinStorage();

  // Required for authorization mixin upgrade compatibility
  let accessControlState = AccessControl.initState();

  // Kept for upgrade compatibility -- do not remove
  stable let ADMIN_PASSCODE = "3762";
  stable let rsvps = Map.empty<Nat, RSVP>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Active RSVP storage
  stable var nextRSVPId : Nat = 1;
  stable var rsvpList : [RSVP] = [];

  let weddingDetails : WeddingDetails = {
    date = "21st August 2026";
    time = "From 7PM";
    venue = "Civvy";
    address = "11 St Leonard's Bank, Perth PH2 8EB";
    description = "Join us at the Civvy to celebrate us becoming Mr and Mrs Mitchell.";
  };

  public query func getWeddingDetails() : async WeddingDetails {
    weddingDetails;
  };

  public shared func submitRSVP(guestName : Text, partySize : Nat, attending : Bool, mealPreference : Text, message : Text) : async Nat {
    let rsvp : RSVP = {
      id = nextRSVPId;
      guestName;
      partySize;
      attending;
      mealPreference;
      message;
      submittedAt = Time.now();
    };
    rsvpList := Array.append<RSVP>(rsvpList, [rsvp]);
    let currentId = nextRSVPId;
    nextRSVPId += 1;
    currentId;
  };

  public query func getAllRSVPs() : async [RSVP] {
    rsvpList;
  };

  public shared func deleteRSVP(id : Nat) : async () {
    rsvpList := Array.filter<RSVP>(rsvpList, func(r : RSVP) : Bool { r.id != id });
  };
};
