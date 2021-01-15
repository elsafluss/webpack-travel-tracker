/* eslint-disable max-len */
const userID = 2
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
    let tripData = getTripData(trips)
    combineDestinationsAndTrips(destinationData, tripData)
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
  ])
  let aggregateDestinationData = []
  destinationData.reduce((total, value) => {
    aggregateDestinationData.push({
      destinationID: value[0],
      lodgingPerDay: value[1],
      flightCost: value[2],
    })
    return aggregateDestinationData
  }, {})
  return aggregateDestinationData
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

function combineDestinationsAndTrips(destinations, trips) {
  let aggregateTravelData = [] // objects from destinations that match this user
  aggregateTravelData = destinations.filter(destination => {
    let destID = destination.destinationID
    let matchingTrip = trips.find(trip => trip.destinationID === destID)
    if (matchingTrip) {
      aggregateTravelData.push(destination)
    }
    return matchingTrip
  })
  console.log(aggregateTravelData)
  return aggregateTravelData
}