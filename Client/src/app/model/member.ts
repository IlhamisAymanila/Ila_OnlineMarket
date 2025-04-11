import { Photos } from "./photos"

export interface Memeber {
    id: number;
    userName: string;  // Fixed property name
    age: number;
    photoUrl: string;
    knowsAs: string | null;  // Fixed property name and nullable type
    created: Date;  // API returns a string, not Date
    lastActive: Date;  // API returns a string, not Date
    gender: string;
    introduction: string;
    interests: string;
    lookingFor: string;
    city: string;
    country: string;
    photos: Photos[];  // Renamed to Photo[] for clarity

}