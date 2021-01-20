import './css/base.scss'
import {
  getATraveler,
  getTrips,
  getDestinations,
} from "./util.js"
import {
  getFormData,
  parseResults
} from "./data-manip.js"
import {
  displayUserName,
  showThisTrip
} from "./dom-updates.js"

const loginButton = document.querySelector(".log-in")

document.querySelector(".submit-form").addEventListener("click", getFormData)

const checkCredentials = (event) => {
  event.preventDefault()
  const username = document.querySelector(".username").value
  const password = document.querySelector(".password").value
  const userID = Number(username.slice(-2))
  if (username.includes("traveler") && password === "travel2020") {
    document.querySelector(".main").classList.remove("hidden")
    let loginFields = document.querySelectorAll(".login")
    loginFields.forEach((field) => field.classList.add("hidden"))
    onStartup(userID)
  } else {
    alert("Please check your username and password and try again.")
  }
  return userID
}

loginButton.addEventListener("click", checkCredentials)

export const onStartup = (userID) => {
  const travelerResults = getATraveler(userID)
    .catch(error => console.log("error getting traveler", error))
  const tripsResults = getTrips()
    .catch(error => console.log("error getting trips", error))
  const destinationsResults = getDestinations()
    .catch(error => console.log("error getting destinations", error))
  Promise.all([travelerResults, destinationsResults, tripsResults])
    .then(data => {
      const currentTraveler = parseResults(data, userID)
      displayUserName(currentTraveler)
      const tripButtons = document.querySelectorAll(".show-trip")
      tripButtons.forEach(button => {
        button.addEventListener('click', showThisTrip)
      })
    })
}

