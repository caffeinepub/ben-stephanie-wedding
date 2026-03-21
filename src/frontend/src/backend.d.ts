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
export interface RSVP {
    id: bigint;
    mealPreference: string;
    submittedAt: bigint;
    guestName: string;
    message: string;
    attending: boolean;
    partySize: bigint;
}
export interface backendInterface {
    deleteRSVP(id: bigint): Promise<void>;
    getAllRSVPs(): Promise<Array<RSVP>>;
    getWeddingDetails(): Promise<WeddingDetails>;
    submitRSVP(guestName: string, partySize: bigint, attending: boolean, mealPreference: string, message: string): Promise<bigint>;
}
