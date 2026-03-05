import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";

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

  public type UserProfile = {
    name : Text;
    // Other user metadata if needed
  };

  // Initialize authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();
  
  var nextRSVPId = 1;
  let rsvps = Map.empty<Nat, RSVP>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Seed initial wedding details
  var weddingDetails : WeddingDetails = {
    date = "June 14, 2026";
    time = "4:00 PM";
    venue = "The Garden Estate";
    address = "123 Rose Lane, Springfield";
    description = "Join us as we celebrate our love surrounded by family and friends.";
  };

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Wedding details - public read access
  public query ({ caller }) func getWeddingDetails() : async WeddingDetails {
    weddingDetails;
  };

  // RSVP submission - public access (guests can submit)
  public shared ({ caller }) func submitRSVP(guestName : Text, partySize : Nat, attending : Bool, mealPreference : Text, message : Text) : async Nat {
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

  // Admin-only: Update wedding details
  public shared ({ caller }) func updateWeddingDetails(date : Text, time : Text, venue : Text, address : Text, description : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update wedding details");
    };
    weddingDetails := {
      date;
      time;
      venue;
      address;
      description;
    };
  };

  // Admin-only: Get all RSVPs
  public query ({ caller }) func getAllRSVPs() : async [RSVP] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all RSVPs");
    };
    rsvps.values().toArray();
  };

  // Admin-only: Delete RSVP
  public shared ({ caller }) func deleteRSVP(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete RSVPs");
    };
    switch (rsvps.get(id)) {
      case (null) { Runtime.trap("RSVP with id " # id.toText() # " does not exist") };
      case (?_) {
        rsvps.remove(id);
      };
    };
  };
};
