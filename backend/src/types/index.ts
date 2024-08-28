export interface Itinerary {
    _id: string;
    budget: string;
    noOfDays: number;
    traveler: string;
    location: string;
    hotels: (any | string)[];
    itinerary: (any | string)[];
};

export interface ItineraryData {
    budget: string;
    noOfDays: number;
    traveler: string;
    location: string;
    hotels: (any | string)[];
    itinerary: (any | string)[];
};

export interface SignupData {
    name: string;
    email: string;
    password: string
}

export interface LoginData {
    email: string;
    password: string
}