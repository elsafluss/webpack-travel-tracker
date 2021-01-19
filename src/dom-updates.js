/* eslint-disable max-len */
import {
  getDestinations,
  getTrips
} from "./util.js"
import { getFormData } from "./data-manip.js"
import Trip, { pushTripToAPI } from "./trip.js"

const tripForm = document.querySelector(".create-trip-form")
const createTripButton = document.querySelector(".submit-form")
const resetButton = document.querySelector(".reset")

createTripButton.addEventListener("click", () => {
  pushTripToAPI()
})

const modalContainer = document.querySelector('.modal-container')
const closeModal = document.querySelector(".close")
closeModal.addEventListener("click", () => {
  modalContainer.classList.remove("show")
})

export const displayUserName = (traveler) => {
  const myNameDisplay = document.querySelector(".traveler-name")
  myNameDisplay.innerText = traveler.travelerName
  myNameDisplay.setAttribute("id", `${traveler.travelerID}`)
  createTripButton.disabled = true
  return traveler.travelerID
}

export const displayTrips = (trip) => { //currenttraveler
  console.log(trip)
  const myTripsDisplay = document.querySelector(".all-trip")
  let button = document.createElement("button")
  let p = document.createElement("p")
  let textNode = document.createTextNode(`${trip.date}`)
  button.appendChild(textNode)
  button.setAttribute("id", trip.id)
  button.setAttribute("class", `show-trip ${trip.status} ${trip.future}`)
  button.addEventListener("click", showThisTrip)
  button.setAttribute("title", `${trip.totalCost}`)
  myTripsDisplay.appendChild(button)
  myTripsDisplay.appendChild(p)
}

export const fillDestinationList = (destinations) => {
  destinations.forEach((destination) => {
    let opt = document.createElement("option")
    opt.innerHTML = destination.destination
    opt.value = destination.destination
    document.querySelector(".choose-destination").appendChild(opt)
  })
  return destinations
}

export const showThisTrip = (event) => {
  let tripID = Number(event.target.id)
  let userID = Number(document.querySelector('.traveler-name').id)
  let tripsResults = getTrips().then((trips) => {
    return trips
  })
  let destinationsResults = getDestinations().then((destinations) => {
    return destinations
  })
  Promise.all([tripsResults, destinationsResults]).then((data) => {
    let trips = data[0].trips
    let destinations = data[1].destinations
    let tripData = combineTripAndDestination(trips, destinations, userID, tripID)
    showTripData(tripData)
  })
  createTripButton.disabled = true
  createTripButton.classList.add("disabled")
  document.querySelector(".trip-price").textContent = `Create another trip!`
}

function combineTripAndDestination(trips, destinations, userID, tripID) {
  const usersTrips = trips.filter((trip) => trip.userID === Number(userID))
  const clickedTrip = usersTrips.find((trip) => trip.id === tripID)
  let showThisDestination = destinations.find(
    (destination) => destination.id === clickedTrip.destinationID
  )
  let tripData = clickedTrip
  tripData.flightCost = showThisDestination.estimatedFlightCostPerPerson
  tripData.lodgingCost = showThisDestination.estimatedLodgingCostPerDay
  tripData.image = showThisDestination.image
  tripData.alt = showThisDestination.alt
  tripData.destination = showThisDestination.destination
  tripData.destinationID = showThisDestination.id
  let currentTrip = new Trip(tripData)
  return currentTrip
}

export const showTripData = (tripData) => {
  modalContainer.classList.add('show')
  document.querySelector(".destination").innerText = `${tripData.destination}`
  document.querySelector('.trip-photo').setAttribute('src', `${tripData.image}`)
  document.querySelector(".departure").innerText = `${tripData.date}`
  document.querySelector(".trip-length").innerText = `${tripData.duration}`
  if (tripData.travelers === 1) {
    document.querySelector(".traveler-count").innerText = ''
    document.querySelector('.friend-count').textContent = 'Just me,'
  } else {
    document.querySelector(".traveler-count").innerText = `${tripData.travelers - 1}`
    document.querySelector(".friend-count").textContent = " of my friends and me,"    
  }
}

export const displayPrice = () => {
  showPrice.value = 'calculating ...'
  let newTrip = getFormData()
  setTimeout(function () {
    document.querySelector(
      ".trip-price"
    ).textContent = `Estimated cost is ${newTrip.totalCost}. Create this trip?`
    createTripButton.disabled = false
    createTripButton.classList.remove("disabled")
    document.querySelector(".trip-price").textContent = `Estimated cost is ${newTrip.totalCost}. Create this trip?`
    createTripButton.disabled = false
    createTripButton.classList.remove("disabled")
    showPrice.value = "how much?"
  }, 3000)
}

const showPrice = document.querySelector(".show-price")
showPrice.addEventListener("click", displayPrice)

resetButton.addEventListener("click", () => {
  let textNode = document.removeChild("trip-price")
  tripForm.removeChild(textNode)
})
