/* eslint-disable max-len */
const userID = 29
import './css/base.scss';
import {
  getTravelers,
  getATraveler,
  getTrips,
  getDestinations,
} from "./util.js"

// how to tell webpack to use an image (also need to link to it in the index.html)
import './images/background-desert.png'
import "./images/globe.svg"
import "./images/money.svg"
import "./images/suitcase.svg"

const myNameDisplay = document.querySelector('.traveler-name')
const myTripsDisplay = document.querySelector('.all-trip')

window.onload = onStartup()

function onStartup() {
  const travelersResults = getTravelers()
    .then((travelers) => {
      return travelers
    })
    .catch((error) => console.log('error getting travelers', error))
  const travelerResults = getATraveler(userID)
    .then((traveler) => {
      myNameDisplay.innerText = traveler.name
      return traveler
    })
    .catch((error) => console.log("error getting traveler", error))
  const tripsResults = getTrips()
    .then((trips) => {
      sortMyTrips(trips).forEach((trip) => {
        displayTrips(trip)
      })
      return trips
    })
    .catch((error) => console.log("error getting trips", error))
  const destinationsResults = getDestinations()
    .then((destinations) => {
      return destinations
    })
    .catch((error) => console.log("error getting destinations", error))
  Promise.all([
    travelersResults,
    travelerResults,
    destinationsResults,
    tripsResults,
  ]).then((data) => {
    let travelers = data[0]
    let traveler = data[1]
    let destinations = data[2].destinations
    let trips = data[3].trips
    let destinationData = getDestinationData(destinations)
    fillDestinationList(destinationData)
    let aggregateTripData = getTripData(trips)
    let specificDestinationData = getDestinationDataForTheseTrips(
      destinationData,
      aggregateTripData
    )
    let lodgingCost = calculateTripCost(specificDestinationData, aggregateTripData)
    let flightCost = calculateFlightCost(
      specificDestinationData,
      aggregateTripData
    )
    let totalSpent = lodgingCost + flightCost
    document.querySelector('.total-spent').innerText = `My trips cost $${totalSpent.toFixed(2)} but the memories are priceless.`
  })
}

function sortMyTrips(trips) {
  let tripsDates = trips.trips
    .filter((trips) => trips.userID === userID)
    .map((trip) => trip.date)
    .sort()
  return tripsDates
}

function displayTrips(trip) {
  let button = document.createElement("button")
  let p = document.createElement("p")
  let textNode = document.createTextNode(`${trip} `)
  button.appendChild(textNode)
  myTripsDisplay.appendChild(button)
  myTripsDisplay.appendChild(p)
}

function getDestinationData(destinations) {
  let destinationData = destinations.map((destinations) => [
    destinations.id,
    destinations.estimatedLodgingCostPerDay,
    destinations.estimatedFlightCostPerPerson,
    destinations.destination,
  ])
  let allDestinationData = []
  destinationData.reduce((total, value) => {
    allDestinationData.push({
      destinationID: value[0],
      lodgingPerDay: value[1],
      flightCost: value[2],
      destinationName: value[3],
    })
    return allDestinationData
  }, {})
  return allDestinationData
}

function getTripData(trips) {
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

function getDestinationDataForTheseTrips(destinations, trips) {
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

function calculateTripCost(specificDestinationData, aggregateTripData) {
  let lodgingCost = 0
  specificDestinationData.filter(destination => {
    let matchingTrip = aggregateTripData.find(trip => trip.destinationID === destination.destinationID)
    if (matchingTrip) {
      let numberOfPeople = matchingTrip.travelerCount
      lodgingCost += (destination.lodgingPerDay * matchingTrip.tripDuration) * numberOfPeople
    }
    return lodgingCost
  })
  return lodgingCost * 1.1
}

function calculateFlightCost(specificDestinationData, aggregateTripData) {
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

function fillDestinationList(destinationData) {
  let sortedByName = destinationData.sort((a, b) => {
    if (a.destinationName < b.destinationName) {
      return -1
    }
  })
  let listOfDestinationNames = sortedByName.map((destination) => destination.destinationName)
  listOfDestinationNames.forEach(function (destination) {
    let opt = document.createElement('option')
    opt.innerHTML = destination
    opt.value = destination
    document.querySelector(".create-destination").appendChild(opt)
  })
  return listOfDestinationNames
}

