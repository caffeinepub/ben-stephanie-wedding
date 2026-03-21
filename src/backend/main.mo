import Array "mo:base/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Principal "mo:core/Principal";
import Map "mo:core/Map";

actor {
  let ADMIN_PASSCODE = "3762";

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

  include MixinStorage();

  let accessControlState = AccessControl.initState();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Kept for upgrade compatibility with previous version (do not remove)
  stable let rsvps = Map.empty<Nat, RSVP>();

  stable var nextRSVPId : Nat = 1;
  stable var rsvpList : [RSVP] = [];

  var weddingDetails : WeddingDetails = {
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

  public query func getAllRSVPs(passcode : Text) : async [RSVP] {
    if (passcode != ADMIN_PASSCODE) {
      Runtime.trap("Unauthorized: Invalid passcode");
    };
    rsvpList;
  };

  public shared func deleteRSVP(id : Nat, passcode : Text) : async () {
    if (passcode != ADMIN_PASSCODE) {
      Runtime.trap("Unauthorized: Invalid passcode");
    };
    rsvpList := Array.filter<RSVP>(rsvpList, func(r : RSVP) : Bool { r.id != id });
  };
};
