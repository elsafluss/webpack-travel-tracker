/* eslint-disable max-len */
export const userID = 35

import './css/base.scss';
// import Trip from './trip.js'
import Traveler from "./traveler.js"
import {
  sortTrip, catalogueTrip
} from "./traveler.js"
import {
  combineTripAndDestination,
  getDestinationData,
  calculateLodgingCost,
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
import Trip from './trip';

window.onload = onStartup()

document.querySelector(".submit-form").addEventListener("click", getFormData)

function onStartup() {
  const travelerResults = getATraveler(userID)
    .catch(error => console.log("error getting traveler", error))
  const tripsResults = getTrips()
    .catch(error => console.log("error getting trips", error))
  const destinationsResults = getDestinations()
    .catch(error => console.log("error getting destinations", error))
  Promise.all([travelerResults, destinationsResults, tripsResults])
    .then(data => {
      let traveler = data[0]
      let destinations = data[1].destinations
      let trips = data[2].trips
      let usersTripsWithDestinationData = combineTripAndDestination(
        trips,
        destinations,
        userID
      )
      let destinationData = getDestinationData(destinations, usersTripsWithDestinationData)
      fillDestinationList(destinations)
      let currentTraveler = new Traveler(
        traveler,
        usersTripsWithDestinationData,
        destinationData
      )
      console.log(currentTraveler)
      displayUserName(currentTraveler)
      usersTripsWithDestinationData.forEach((trip) => {
        catalogueTrip(trip, currentTraveler)
        sortTrip(trip, currentTraveler)
        displayTrips(trip)
        // let lodgingCost = calculateLodgingCost(
        //   trip,
        //   destinationData,
        //   currentTraveler
        //   )
        let newTrip = new Trip(trip)
        // let flightCost = calculateFlightCost(trip)
        // let totalSpent = lodgingCost + flightCost
      })
      // write func that calculates this year's spending and call it here
    })
    .then(() => {
      let tripButtons = document.querySelectorAll(".show-trip")
      tripButtons.forEach(button => {
        button.addEventListener('click', showThisTrip)
      })
    })
}
