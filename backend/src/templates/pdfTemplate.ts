/*
_id
66cf3b5d2fd712a4344fef3b
userId
"66cefe6bcd8725753a251f9b"
budget
"Moderate"
noOfDays
5
traveler
"Group (6-10 people)"
location
"Mumbai, Maharashtra, India"

hotels
Array (3)

itinerary
Array (5)

0
Object
day
1

plan
Array (2)

0
Object
placeName
"Gateway of India"
placeDetails
"A historic arch built in 1924, a popular landmark and a must-visit for…"
placeImageUrl
"https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Gateway_of_I…"

geoCoordinates
Array (2)
ticketPricing
"Free"
rating
4.8
timeToTravel
"1 hour"
bestTimeToVisit
"Sunset"

1
Object

1
Object

2
Object

3
Object

4
Object
createdAt
2024-08-28T14:59:41.746+00:00
updatedAt
2024-08-28T14:59:41.746+00:00
__v
0
*/

import { Itinerary } from "../types";

interface DayPlan {
    plan: any[]; 
}

export function itineraryHtml(username: string, itineraries: any): string {
    
    const itinerary = itineraries._doc;

    const daysWiseHtml = Array.isArray(itinerary.itinerary) ? itinerary.itinerary.map((dayPlan:DayPlan, index:any) => {
        if (!Array.isArray(dayPlan.plan)) {
            console.error(`Places data for day ${index + 1} is invalid or not an array.`);
            return `<div class="day"><h2>Day ${index + 1}</h2><p>No data available</p></div>`;
        }
        
        const planHtml = dayPlan.plan.map((place: any) => {
            if (!place.placeName) {
                console.error("Invalid place data:", place);
                return "<div>No place name available</div>";
            }
    
            const gmapsUrl = `https://google.com/maps/search/?api=1&query=${place?.placeName}`
            return `
                <div class="place">
                    <h3>${place.placeName}</h3>
                    <p class="description">${place.placeDetails || 'No details available'}</p>
                    <p><strong>Time required to travel:</strong> ${place.timeToTravel || 'N/A'}</p>
                    <p><strong>Best time to visit</strong> ${place.bestTimeToVisit || 'N/A'}</p>
                    <p><strong>Rating</strong> ${place.rating || 'N/A'}</p>
                    <p><a href="${gmapsUrl}" target="_blank">View on Google Maps</a></p>
                </div>`;
        }).join('');
    
        return `<div class="day"><h2>Day ${index + 1}</h2>${planHtml}</div>`;
    }).join('') : `<p>No itinerary available.</p>`;
    
    const hotelHtml = Array.isArray(itinerary.hotels) ? itinerary.hotels.map((hotel:any, index:any) => {
        if (!hotel.hotelName) {
            console.error("Invalid hotel data:", hotel);
            return "<div>No hotel name available</div>";
        }
        const gmapsUrl = `https://google.com/maps/search/?api=1&query=${hotel?.hotelName}`
        return `
            <div class="hotel">
                <h3>Hotel: ${hotel.hotelName}</h3>
                <p class="description">${hotel.description || 'No description available'}</p>
                <p><strong>Address:</strong> ${hotel.hotelAddress || 'N/A'}</p>
                <p><strong>Price:</strong> ${hotel.price || 'N/A'}</p>
                <p><strong>Rating:</strong> ${hotel.rating || 'N/A'}</p>
                <p><a href="${gmapsUrl}" target="_blank">View on Google Maps</a></p>
            </div>`;
    }).join('') : `<p>No hotels available.</p>`;
     

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Personalized Travel Itinerary</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  color: #333;
                  display: flex;
                  flex-direction: column;
                  min-height: 100vh;
              }
              .container {
                  flex: 1;
                  max-width: 1200px;
                  margin: 0 auto;
                  padding: 20px;
                  page-break-inside: avoid;
              }
              .banner {
                  width: 100%;
                  height: 300px;
                  background-image: url('https://picsum.photos/1000/300');
                  background-size: cover;
                  background-position: center;
                  border-radius: 10px;
                  margin-bottom: 20px;
                  page-break-after: avoid;
              }
              h1 {
                  font-size: 2em;
                  margin-bottom: 10px;
              }
              .itinerary-info {
                  background: #f9f9f9;
                  padding: 15px;
                  border-radius: 10px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  page-break-inside: avoid;
              }
              .day {
                  margin-bottom: 20px;
                  page-break-inside: avoid;
              }
              .day h2 {
                  font-size: 1.5em;
                  margin-bottom: 10px;
              }
              .place {
                  background: #fff;
                  padding: 10px;
                  margin-bottom: 10px;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  page-break-inside: avoid;
              }
              .place h3 {
                  margin-top: 0;
              }
              .place p {
                  margin: 5px 0;
              }
              .place .description {
                  font-style: italic;
              }
              .precautions {
                  background: #e8f4f8;
                  padding: 15px;
                  border-radius: 8px;
                  margin-top: 20px;
                  page-break-inside: avoid;
              }
              .footer {
                  text-align: center;
                  padding: 10px;
                  background: #333;
                  color: #fff;
                  margin-top: auto;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="banner"></div>
              <div class="itinerary-info">
                  <h1>Your Personalized Travel Itinerary</h1>
                  <h2><strong>For:</strong> ${username}</h2>
                  <p><strong>Destination:</strong> ${itinerary.location}</p>
                  <p><strong>Time required:</strong> ${itinerary.noOfDays} days</p>
                  <p><strong>Budget:</strong> ${itinerary.budget} Expensive</p>
                  ${daysWiseHtml}
                  <p>Hotel details: </p>
                  ${hotelHtml}
              </div>
          </div>
          <div class="footer">
              &copy; ${new Date().getFullYear()} Omkar Gade. All rights reserved.
          </div>
      </body>
      </html>
  `;
}