import './css/base.scss';
import {
  getFormData,
  parseResults
} from "./data-manip.js"
import {
  displayUserName,
  showThisTrip
} from "./dom-updates.js"
import {
  getATraveler,
  getTrips,
  getDestinations,
} from "./util.js"
let userID
const loginButton = document.querySelector(".log-in")

document.querySelector(".submit-form").addEventListener("click", getFormData)

const checkCredentials = () => {
  const username = document.querySelector(".username").value
  const password = document.querySelector(".password").value
  const userID = username.slice(-2)
  if (username.includes("username") && password === "travel2020") {
    // and check length of username
    document.querySelector(".main").classList.remove("hidden")
    let loginFields = document.querySelectorAll(".login")
    loginFields.forEach((field) => field.classList.add("hidden"))
  } else {
    alert("Please check your username and password and try again.")
  }
  onStartup(userID)
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
      let currentTraveler = parseResults(data)
      displayUserName(currentTraveler)
      let tripButtons = document.querySelectorAll(".show-trip")
      tripButtons.forEach(button => {
        button.addEventListener('click', showThisTrip)
      })
    })
}

export {
  userID as userID
}