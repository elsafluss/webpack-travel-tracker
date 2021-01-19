/* eslint-disable max-len */
import {
  userID
} from "."
import Trip from "./trip"
import Traveler, {
  catalogueTrip,
  sortTrip
} from "./traveler"
import {
  fillDestinationList,
  displayTrips
} from "./dom-updates"

// this helper func is technically only like 16 lines
export const parseResults = (data, userID) => {
  let usersTripsWithDestinationData = combineTripAndDestination(
    data[2].trips,
    data[1].destinations,
    userID
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
      currency: "USD"
    })
    catalogueTrip(trip, currentTraveler)
    sortTrip(trip, currentTraveler)
    displayTrips(trip, currentTraveler)
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
  let date = document.querySelector(".create-trip-date").value.split("-").join("/")
  let newTrip = {
    userID,
    date,
    duration: Number(document.querySelector(".create-trip-duration").value),
    travelers: Number(document.querySelector(".create-trip-numPeople").value),
    destination: document.querySelector(".choose-destination").value,
  }
  let createdTrip = new Trip(newTrip)
  createdTrip.matchWithDestinationData(createdTrip)
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
  if (trip.newTripID > 50) {
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
  if (trip.newTripID > 50) {
    return trip.flightCost * trip.duration * trip.travelers * 1.1
  } else {
    return (trip.destinationData.estimatedFlightCostPerPerson *
      trip.duration *
      trip.travelers *
      1.1)
  }
}

