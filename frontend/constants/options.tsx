export const TravelersList=[
    {
        id:1,
        title:"Solo",
        desc:"You are the only person traveling",
        people:'1'
    },
    {
        id:2,
        title:"Duo",
        desc:"There's two of you traveling",
        people:'2'
    },
    {
        id:3,
        title:"Family",
        desc:"Family trip",
        people:'4 to 6 people'
    },
    {
        id:4,
        title:"Friends",
        desc:"Friends trip",
        people:'6 to 10 people'
    },
]

export const BudgetList = [
    {
        id:1,
        title: "Cheap",
        desc: "Stays conscious of costs"
    },
    {
        id:2,
        title: "Moderate",
        desc: "Keep cost on the average side"
    },
    {
        id:1,
        title: "Luxury",
        desc: "No issue of costs"
    }
]

export const AI_PROMPT="Generate Travel Plan for Location: {location}, for {noOfDays} days for {traveler} with a {budget} budget. Give me list of Hotel options with Hotel Name, Hotel Address, Price, Hotel Image Url, geo coordinates, rating, descriptions and suggest itinerary with place name, Place Details, Place Image Url, Geo Coordinates, ticket pricing, rating, time to travel each location for {noOfDays} days with each day plan with best time to visit in JSON Format"