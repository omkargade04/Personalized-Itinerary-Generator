export type UserData = {
    user_id: string;
    name: string;
    email: string;
};

export type UserCredential = {
    token: string;
    data: UserData;
};

export type AuthContextType = {
    authState: UserCredential;
    setUserAuthInfo: (data: UserCredential) => void;
    isUserAuthenticated: () => boolean;
};

export type LoginForm = {
    email: string;
    password: string;
};
  
  export type RegisterForm = {
    name: string;
    email: string;
    password: string;
};

export type Itinerary = {
    _id: string;
    budget: string;
    noOfDays: number;
    traveler: string;
    location: string;
    hotels: (any | string)[];
    itinerary: (any | string)[];
}

export type Place = {
    placeName: string;
    placeDetails: string;
    placeImageUrl: string;
    geoCoordinates: [number, number];
    ticketPricing: string;
    rating: number;
    timeToTravel: string;
    bestTimeToVisit: string;
}

export type Hotel = {
    hotelName: string;
    hotelAddress: string;
    price: string;
    hotelImageUrl: string;
    geoCoordinates: [number, number];
    rating: number;
    description: string;
};
