/* eslint-disable max-len */
import { userID } from "."
import Trip from "./trip"

export const getDestinationData = (destinations) => {
  let destinationData = destinations.map((destinations) => [
    destinations.id,
    destinations.estimatedLodgingCostPerDay,
    destinations.estimatedFlightCostPerPerson,
    destinations.destination,
    destinations.image,
  ])
  let allDestinationData = []
  destinationData.reduce((total, value) => {
    allDestinationData.push({
      destinationID: value[0],
      lodgingPerDay: value[1],
      flightCost: value[2],
      destinationName: value[3],
      destinationImage: value[4],
    })
    return allDestinationData
  }, {})
  return allDestinationData
}

export const getTripData = (trips, userID) => {
  let tripData = trips
    .filter((trips) => trips.userID === userID)
    .map((trip) => [
      trip.id,
      trip.destinationID,
      trip.duration,
      trip.travelers,
      trip.date,
      trip.status,
      trip.suggestedActivities,
      trip.userID
    ])
  let aggregateTripData = []
  tripData.reduce((_total, value) => {
    aggregateTripData.push({
      tripID: value[0],
      destinationID: value[1],
      tripDuration: value[2],
      travelerCount: value[3],
      date: value[4],
      status: value[5],
      suggestedActivities: value[6],
      userID: value[7]
    })
    return aggregateTripData
  }, {})
  return aggregateTripData
}

export const getDestinationDataForTheseTrips = (destinations, trips) => {
  let specificDestinationData = []
  specificDestinationData = destinations.filter((destination) => {
    let destID = destination.destinationID
    let matchingTrip = trips.find((trip) => trip.destinationID === destID)
    if (matchingTrip) {
      specificDestinationData.push(destination)
    }
    return matchingTrip
  })
  return specificDestinationData
}

export const calculateTripCost = (trip) => {
  let lodgingCost = trip.lodgingCost * trip.duration * trip.travelers * 1.1
  return lodgingCost
}

export const calculateFlightCost = (trip) => {
  let flightCost = trip.flightCost * trip.travelers * 1.1
  return flightCost
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

