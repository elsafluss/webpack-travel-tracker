/* eslint-disable max-len */
import { userID } from "."
import Trip from "./trip"
// import { displayTrip } from "./trip"

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
    .map((trip) => [trip.id, trip.destinationID, trip.duration, trip.travelers])
  let aggregateTripData = []
  tripData.reduce((total, value) => {
    aggregateTripData.push({
      tripID: value[0],
      destinationID: value[1],
      tripDuration: value[2],
      travelerCount: value[3],
    })
    return aggregateTripData
  }, {})
  return aggregateTripData
}

export const getDestinationDataForTheseTrips = (destinations, trips) => {
  let specificDestinationData = []
  specificDestinationData = destinations.filter(destination => {
    let destID = destination.destinationID
    let matchingTrip = trips.find(trip => trip.destinationID === destID)
    if (matchingTrip) {
      specificDestinationData.push(destination)
    }
    return matchingTrip
  })
  return specificDestinationData
}

export const calculateTripCost = (specificDestinationData, aggregateTripData) => {
  let lodgingCost = 0
  specificDestinationData.filter((destination) => {
    let matchingTrip = aggregateTripData.find(
      (trip) => trip.destinationID === destination.destinationID
    )
    if (matchingTrip) {
      let numberOfPeople = matchingTrip.travelerCount
      lodgingCost +=
        destination.lodgingPerDay * matchingTrip.tripDuration * numberOfPeople
    }
    return lodgingCost
  })
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
  let selectedDate = document.querySelector(".create-trip-date").value.split("-").join("/")
  let newTrip = {
    userID,
    selectedDate,
    selectedLength: document.querySelector(".create-trip-duration").value,
    selectedGroupSize: document.querySelector(".create-trip-numPeople").value,
    selectedDestination: document.querySelector(".choose-destination").value,
  }
  let createdTrip = new Trip(newTrip)
  createdTrip.matchWithDestinationData()
}

