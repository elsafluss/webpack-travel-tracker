/* eslint-disable max-len */
export const userID = 32
import './css/base.scss';
// import Trip from './trip.js'
import Traveler from "./traveler.js"
import {
  sortMyTrips
} from "./traveler.js"
import {
  getDestinationData,
  getTripData,
  getDestinationDataForTheseTrips,
  calculateTripCost,
  calculateFlightCost,
  getFormData,
} from "./data-manip.js"
import {
  displayTrips,
  displayUserName,
  fillDestinationList,
  showThisTrip,
} from "./dom-updates.js"
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

window.onload = onStartup()

document.querySelector(".submit-form").addEventListener("click", getFormData)

function onStartup() {
  const travelersResults = getTravelers()
    .then(travelers => {
      return travelers
    })
    .catch(error => console.log('error getting travelers', error))
  const travelerResults = getATraveler(userID)
    .then(traveler => {
      displayUserName(traveler)
      return traveler
    })
    .catch(error => console.log("error getting traveler", error))
  const tripsResults = getTrips()
    .then(trips => {
      sortMyTrips(trips, userID).forEach((trip) => {
        displayTrips(trip)
      })
      return trips
    })
    .catch(error => console.log("error getting trips", error))
  const destinationsResults = getDestinations()
    .then((destinations) => {
      return destinations
    })
    .catch(error => console.log("error getting destinations", error))
  Promise.all([
    travelersResults,
    travelerResults,
    destinationsResults,
    tripsResults,
  ]).then(data => {
    // let travelers = data[0]
    let traveler = data[1]
    let destinations = data[2].destinations
    let trips = data[3].trips
    let destinationData = getDestinationData(destinations)
    fillDestinationList(destinationData)
    let aggregateTripData = getTripData(trips, userID)
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
    createTraveler(traveler, aggregateTripData, specificDestinationData, totalSpent)
    document.querySelector('.total-spent').innerText = `I've spent $${totalSpent.toFixed(2)} creating these priceless memories.`
  })
    .then(() => {
      let tripButtons = document.querySelectorAll(".show-trip")
      tripButtons.forEach(button => {
        button.addEventListener('click', showThisTrip)
      })
    })
}

function createTraveler(
  traveler,
  aggregateTripData,
  specificDestinationData,
  totalSpent
) {
  let currentTraveler = new Traveler(
    userID,
    traveler.name,
    traveler.travelerType,
    aggregateTripData,
    specificDestinationData,
    totalSpent
  )
  return currentTraveler
}