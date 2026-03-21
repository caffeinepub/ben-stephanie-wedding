import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

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

  // These stable variables are kept for upgrade compatibility with previous
  // versions of the backend. They are no longer used for functionality.
  let accessControlState = AccessControl.initState();
  let userProfiles = Map.empty<Principal, UserProfile>();

  stable var nextRSVPId = 1;
  stable let rsvps = Map.empty<Nat, RSVP>();

  var weddingDetails : WeddingDetails = {
    date = "21st August 2026";
    time = "From 7PM";
    venue = "Civvy";
    address = "11 St Leonard's Bank, Perth PH2 8EB";
    description = "Join us at the Civvy to celebrate us becoming Mr and Mrs Mitchell.";
  };

  // Public: get wedding details
  public query func getWeddingDetails() : async WeddingDetails {
    weddingDetails;
  };

  // Public: submit RSVP (any guest can submit)
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
    rsvps.add(nextRSVPId, rsvp);
    let currentId = nextRSVPId;
    nextRSVPId += 1;
    currentId;
  };

  // Admin: get all RSVPs (passcode-protected)
  public query func getAllRSVPs(passcode : Text) : async [RSVP] {
    if (passcode != ADMIN_PASSCODE) {
      Runtime.trap("Unauthorized: Invalid passcode");
    };
    rsvps.values().toArray();
  };

  // Admin: delete RSVP (passcode-protected)
  public shared func deleteRSVP(id : Nat, passcode : Text) : async () {
    if (passcode != ADMIN_PASSCODE) {
      Runtime.trap("Unauthorized: Invalid passcode");
    };
    switch (rsvps.get(id)) {
      case (null) { Runtime.trap("RSVP not found") };
      case (?_) { rsvps.remove(id) };
    };
  };
};
