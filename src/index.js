export const userID = 31

import './css/base.scss';
import {
  getFormData,
  parseResults
} from "./data-manip.js"
import {
  displayUserName,
  showThisTrip,
} from "./dom-updates.js"
import {
  getATraveler,
  getTrips,
  getDestinations,
} from "./util.js"

window.onload = onStartup()

document.querySelector(".submit-form")
  .addEventListener("click", getFormData)

function onStartup() {
  const travelerResults = getATraveler(userID)
    .catch(error => console.log("error getting traveler", error))
  const tripsResults = getTrips()
    .catch(error => console.log("error getting trips", error))
  const destinationsResults = getDestinations()
    .catch(error => console.log("error getting destinations", error))
  Promise.all([travelerResults, destinationsResults, tripsResults])
    .then(data => {
      let currentTraveler = parseResults(data)
      displayUserName(currentTraveler)
      let tripButtons = document.querySelectorAll(".show-trip")
      tripButtons.forEach(button => {
        button.addEventListener('click', showThisTrip)
      })
    })

}