import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WeddingDetails {
    venue: string;
    date: string;
    time: string;
    description: string;
    address: string;
}
export interface UserProfile {
    name: string;
}
export interface RSVP {
    id: bigint;
    mealPreference: string;
    submittedAt: bigint;
    guestName: string;
    message: string;
    attending: boolean;
    partySize: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteRSVP(id: bigint): Promise<void>;
    getAllRSVPs(): Promise<Array<RSVP>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWeddingDetails(): Promise<WeddingDetails>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitRSVP(guestName: string, partySize: bigint, attending: boolean, mealPreference: string, message: string): Promise<bigint>;
    updateWeddingDetails(date: string, time: string, venue: string, address: string, description: string): Promise<void>;
}
