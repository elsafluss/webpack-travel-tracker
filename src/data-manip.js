/* eslint-disable max-len */
import Trip from "./trip"
import Traveler, {
  catalogueTrip,
  sortTrip
} from "./traveler"
import {
  fillDestinationList,
  displayTrips
} from "./dom-updates"

export const parseResults = (data, userID, event) => {
  let usersTripsWithDestinationData = combineTripAndDestination(
    data[2].trips,
    data[1].destinations,
    userID,
    event
  )
  let destinationData = getDestinationData(
    data[1].destinations,
    usersTripsWithDestinationData
  )
  fillDestinationList(data[1].destinations)
  let currentTraveler = new Traveler(
    data[0],
    usersTripsWithDestinationData,
    destinationData,
    userID
  )
  usersTripsWithDestinationData.forEach((trip) => {
    trip.totalCost = (
      calculateLodgingCost(trip) + calculateFlightCost(trip)
    ).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    })
    catalogueTrip(trip, currentTraveler)
    sortTrip(trip, currentTraveler)
    displayTrips(trip)
    // getAnnualSpending() based on date year
  })
  return currentTraveler
}

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

export const getFormData = () => {
  let userID = Number(document.querySelector(".traveler-name").id)
  let date = document.querySelector(".create-trip-date").value.split("-").join("/")
  let newTrip = {
    userID,
    date,
    duration: Number(document.querySelector(".create-trip-duration").value),
    travelers: Number(document.querySelector(".create-trip-numPeople").value),
    destination: document.querySelector(".choose-destination").value,
  }
  let createdTrip = new Trip(newTrip)
  newTrip = createdTrip.matchWithDestinationData(createdTrip)
  return createdTrip
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
  if (trip.id > 50) {
    return (
      trip.lodgingCost *
      trip.duration *
      trip.travelers *
      1.1
    )
  } else {
    return (trip.destinationData.estimatedLodgingCostPerDay *
      trip.duration *
      trip.travelers *
      1.1)
  }
}

export const calculateFlightCost = (trip) => {
  if (trip.id > 50) {
    return trip.flightCost * trip.duration * trip.travelers * 1.1
  } else {
    return (trip.destinationData.estimatedFlightCostPerPerson *
      trip.duration *
      trip.travelers *
      1.1)
  }
}
