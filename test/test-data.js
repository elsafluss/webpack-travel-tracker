/* eslint-disable max-len */

export const destinations = [{
  "id": 1,
  "destination": "Lima, Peru",
  "estimatedLodgingCostPerDay": 70,
  "estimatedFlightCostPerPerson": 400,
  "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
  "alt": "overview of city buildings with a clear sky"
},
{
  "id": 2,
  "destination": "Stockholm, Sweden",
  "estimatedLodgingCostPerDay": 100,
  "estimatedFlightCostPerPerson": 780,
  "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "alt": "city with boats on the water during the day time"
}]

export const travelers = [
  {
    id: 1,
    name: "Ham Leadbeater",
    travelerType: "relaxer",
  },
  {
    id: 2,
    name: "Rachael Vaughten",
    travelerType: "thrill-seeker",
  },
  {
    id: 3,
    name: "Sibby Dawidowitsch",
    travelerType: "shopper",
  },
]

export const trips = [
  {
    id: 1,
    userID: 44,
    destinationID: 49,
    travelers: 1,
    date: "2019/09/16",
    duration: 8,
    status: "approved",
    suggestedActivities: [],
  },
  {
    id: 2,
    userID: 35,
    destinationID: 25,
    travelers: 5,
    date: "2020/10/04",
    duration: 18,
    status: "pending",
    suggestedActivities: [],
  },
]