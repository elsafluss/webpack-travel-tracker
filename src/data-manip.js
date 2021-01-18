/* eslint-disable max-len */
import { userID } from "."
import Trip from "./trip"
import Traveler, { catalogueTrip, sortTrip } from "./traveler"
import { fillDestinationList, displayTrips } from "./dom-updates"

export const getDestinationData = (destinations, trips) => {
  let userDestinationData = []
  userDestinationData = destinations.filter((destination) => {
    let matchingTrip = trips.find(trip => trip.destinationID === destination.id)
    if (matchingTrip) {
      userDestinationData.push(destination)
    }
    return matchingTrip
  })
  return userDestinationData
}

export const combineTripAndDestination = (allTrips, allDestinations, userID) => {
  return allTrips.filter(trip => {
    if (trip.userID === userID) {
      return allDestinations.filter((destination) => {
        if (destination.id === trip.destinationID) {
          trip.destinationData = destination
        }
      })
    }
  })
}

export const calculateLodgingCost = (trip) => {
  return (trip.destinationData.estimatedLodgingCostPerDay *
    trip.duration *
    trip.travelers *
    1.1)
}

export const calculateFlightCost = (trip) => {
  return (trip.destinationData.estimatedFlightCostPerPerson *
    trip.duration *
    trip.travelers *
    1.1)
}

export const getFormData = () => {
  let date = document
    .querySelector(".create-trip-date")
    .value.split("-")
    .join("/")
  let newTrip = {
    userID,
    date,
    duration: document.querySelector(".create-trip-duration").value,
    travelers: document.querySelector(".create-trip-numPeople").value,
    destination: document.querySelector(".choose-destination").value,
  }
  let createdTrip = new Trip(newTrip)
  createdTrip.matchWithDestinationData(newTrip)
  // can I use combinetripanddestination and getdestinationdata
  // instead of matchwithdestinationdata
}

export const parseResults = (data) => {
  let traveler = data[0]
  let destinations = data[1].destinations
  let trips = data[2].trips
  let usersTripsWithDestinationData = combineTripAndDestination(
    trips,
    destinations,
    userID
  )
  let destinationData = getDestinationData(
    destinations,
    usersTripsWithDestinationData
  )
  fillDestinationList(destinations)
  let currentTraveler = new Traveler(
    traveler,
    usersTripsWithDestinationData,
    destinationData
  )
  usersTripsWithDestinationData.forEach((trip) => {
    catalogueTrip(trip, currentTraveler)
    sortTrip(trip, currentTraveler)
    displayTrips(trip)
    let totalSpent = (
      calculateLodgingCost(trip) + calculateFlightCost(trip)
    ).toLocaleString("en-US", { style: "currency", currency: "USD" })
    // getAnnualSpending() based on date year
    // let newTrip = new Trip(trip)
    // when to instantiate a trip?
    // just when a new one is made? yeah
  })
  return currentTraveler
}