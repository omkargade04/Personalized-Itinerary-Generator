"use client";

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: {location}, for {noOfDays} for {traveler} with a {budget} budget. Give me list of Hotel options with Hotel Name, Hotel Address, Price, Hotel Image Url, geo coordinates, rating, descriptions and suggest itinerary with place name, Place Details, Place Image Url, Geo Coordinates, ticket pricing, rating, time to travel each location for {noOfDays} with each day plan with best time to visit in JSON Format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "location": "{location}",\n  "noOfDays": {noOfDays},\n  "traveler": "{traveler}",\n  "budget": {budget},\n  "hotels": [\n    {\n      "hotelName": "Hotel Name 1",\n      "hotelAddress": "Hotel Address 1",\n      "price": "$100 - $200",\n      "hotelImageUrl": "https://example.com/hotel1.jpg",\n      "geoCoordinates": [latitude, longitude],\n      "rating": 4.5,\n      "description": "Description of Hotel 1"\n    },\n    {\n      "hotelName": "Hotel Name 2",\n      "hotelAddress": "Hotel Address 2",\n      "price": "$50 - $100",\n      "hotelImageUrl": "https://example.com/hotel2.jpg",\n      "geoCoordinates": [latitude, longitude],\n      "rating": 4,\n      "description": "Description of Hotel 2"\n    },\n    {\n      "hotelName": "Hotel Name 3",\n      "hotelAddress": "Hotel Address 3",\n      "price": "$150 - $250",\n      "hotelImageUrl": "https://example.com/hotel3.jpg",\n      "geoCoordinates": [latitude, longitude],\n      "rating": 4.8,\n      "description": "Description of Hotel 3"\n    }\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "plan": [\n        {\n          "placeName": "Place 1",\n          "placeDetails": "Details about Place 1",\n          "placeImageUrl": "https://example.com/place1.jpg",\n          "geoCoordinates": [latitude, longitude],\n          "ticketPricing": "$10",\n          "rating": 4.2,\n          "timeToTravel": "2 hours",\n          "bestTimeToVisit": "Morning"\n        },\n        {\n          "placeName": "Place 2",\n          "placeDetails": "Details about Place 2",\n          "placeImageUrl": "https://example.com/place2.jpg",\n          "geoCoordinates": [latitude, longitude],\n          "ticketPricing": "Free",\n          "rating": 4.8,\n          "timeToTravel": "1 hour",\n          "bestTimeToVisit": "Afternoon"\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "plan": [\n        {\n          "placeName": "Place 3",\n          "placeDetails": "Details about Place 3",\n          "placeImageUrl": "https://example.com/place3.jpg",\n          "geoCoordinates": [latitude, longitude],\n          "ticketPricing": "$20",\n          "rating": 4.5,\n          "timeToTravel": "3 hours",\n          "bestTimeToVisit": "Morning"\n        },\n        {\n          "placeName": "Place 4",\n          "placeDetails": "Details about Place 4",\n          "placeImageUrl": "https://example.com/place4.jpg",\n          "geoCoordinates": [latitude, longitude],\n          "ticketPricing": "Free",\n          "rating": 4.1,\n          "timeToTravel": "2 hours",\n          "bestTimeToVisit": "Evening"\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "plan": [\n        {\n          "placeName": "Place 5",\n          "placeDetails": "Details about Place 5",\n          "placeImageUrl": "https://example.com/place5.jpg",\n          "geoCoordinates": [latitude, longitude],\n          "ticketPricing": "$15",\n          "rating": 4.9,\n          "timeToTravel": "4 hours",\n          "bestTimeToVisit": "Morning"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Explanation:**\n\n* **location:** The name of the location (e.g., "Paris").\n* **noOfDays:** The number of days for the trip (e.g., "5").\n* **traveler:** The type of traveler (e.g., "family", "couple", "solo").\n* **budget:** The estimated budget for the trip (e.g., "$1000").\n* **hotels:** An array of hotel options with details like name, address, price, image URL, geo coordinates, rating, and a brief description.\n* **itinerary:** An array of daily plans. Each day\'s plan contains an array of places to visit with information like name, details, image URL, geo coordinates, ticket pricing, rating, time to travel, and the best time to visit.\n\n**How to use this structure:**\n\n1. **Replace placeholders:** Replace `{location}`, `{noOfDays}`, `{traveler}`, and `{budget}` with your desired values.\n2. **Fill in details:** Provide specific details for each hotel and place, including names, descriptions, addresses, image URLs, prices, ratings, and geo coordinates.\n3. **Add more days:** If you want to create a longer trip, add more days and plans to the "itinerary" array.\n\n**Important notes:**\n\n* This structure is a starting point. You can customize it to include additional information or details you find important.\n* This is a basic template, and you\'ll need to find the actual data (like hotel and place information) using travel APIs or websites like Google Maps, TripAdvisor, etc.\n* You can use a travel planning API to get this data and automatically populate the structure. \n\nThis structure will help you organize your travel plan in a structured and easily understandable format. \n',
        },
      ],
    },
  ],
});

//     const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//     console.log(result.response.text());

//   run();
