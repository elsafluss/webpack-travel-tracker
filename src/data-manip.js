/* eslint-disable max-len */
import { userID } from "."
import Trip from "./trip"
// import { displayTrip } from "./trip"

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


export const calculateLodgingCost = (trip, destinations, traveler) => {

  let lodgingCost = 0
  // destinations.forEach(destination => {
  //   // if (destination.id === trip.destinationID) {

  //   // }
  // });
  let numberOfPeople = trip.travelerCount
  lodgingCost += trip.lodgingPerDay * trip.tripDuration * numberOfPeople
  return lodgingCost * 1.1
}

export const calculateFlightCost = (specificDestinationData, aggregateTripData) => {
  let flightCost = 0
  specificDestinationData.filter((destination) => {
    let matchingTrip = aggregateTripData.find(
      (trip) => trip.destinationID === destination.destinationID
    )
    if (matchingTrip) {
      flightCost += destination.flightCost * matchingTrip.travelerCount
    }
    return flightCost
  })
  return flightCost * 1.1
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
}

