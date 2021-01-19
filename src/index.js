/* eslint-disable max-len */
export const userID = 35

import './css/base.scss';
// import Trip from './trip.js'
import Traveler from "./traveler.js"
import {
  getMyTrips
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
  getATraveler,
  getTrips,
  getDestinations,
} from "./util.js"

// how to tell webpack to use an image (also need to link to it in the index.html)
// import './images/background-desert.png'
// import "./images/globe.svg"
// import "./images/money.svg"
// import "./images/suitcase.svg"

window.onload = onStartup()

document.querySelector(".submit-form").addEventListener("click", getFormData)

function onStartup() {
  const travelerResults = getATraveler(userID)
    .then(traveler => {
      displayUserName(traveler)
      return traveler
    })
    .catch(error => console.log("error getting traveler", error))
  const tripsResults = getTrips()
    .catch(error => console.log("error getting trips", error))
  const destinationsResults = getDestinations()
    .then((destinations) => {
      return destinations
    })
    .catch(error => console.log("error getting destinations", error))
  Promise.all([
    travelerResults,
    destinationsResults,
    tripsResults,
  ]).then(data => {
    let traveler = data[0]
    let destinations = data[1].destinations
    let trips = data[2].trips
    let destinationData = getDestinationData(destinations)
    fillDestinationList(destinationData)
    let aggregateTripData = getTripData(trips, userID)
    let specificDestinationData = getDestinationDataForTheseTrips(
      destinationData,
      aggregateTripData
    )
    let lodgingCost = calculateTripCost(
      specificDestinationData,
      aggregateTripData
    )
    let flightCost = calculateFlightCost(
      specificDestinationData,
      aggregateTripData
    )
    let totalSpent = lodgingCost + flightCost
    let currentTraveler = createTraveler(
      traveler,
      aggregateTripData,
      specificDestinationData,
      totalSpent
    )
    getMyTrips(currentTraveler)
    currentTraveler.trips.forEach((trip) => {
      displayTrips(trip)
    })
    document.querySelector(".total-spent").innerText = `I've spent $${totalSpent.toFixed(2)} creating these priceless memories.`
  })
    .then(() => {
      let tripButtons = document.querySelectorAll(".show-trip")
      tripButtons.forEach(button => {
        button.addEventListener('click', showThisTrip)
      })
    })
  // start with login page visible, main hidden

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
}