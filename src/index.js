/* eslint-disable max-len */
// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import {
  getTravelers,
  getATraveler,
  getTrips,
  getDestinations,
} from "./util.js"

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

window.onload = onStartup()

function onStartup() {
  const travelersResults = getTravelers()
    .then((travelers) => {
      console.log(travelers)
    })
    .catch((error) => console.log(error))
  const travelerResults = getATraveler(1) // pass in traveler's id
    .then((traveler) => {
      console.log(traveler)
    })
    .catch((error) => console.log(error))
  const tripsResults = getTrips()
    .then((trip) => {
      console.log(trip)
    })
    .catch((error) => console.log(error))
  const destinationsResults = getDestinations()
    .then((destination) => console.log(destination))
    .catch((error) => console.log(error))
}