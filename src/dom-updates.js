/* eslint-disable max-len */
import {
  getDestinations,
  getTrips
} from "./util.js"
import {
  userID
} from "./index.js"
import Trip from "./trip.js"

const modalContainer = document.querySelector('.modal-container')
const closeModal = document.querySelector(".close")

export const displayUserName = (traveler) => {
  const myNameDisplay = document.querySelector(".traveler-name")
  myNameDisplay.innerText = traveler.travelerName
  return traveler.travelerID
}

export const displayTrips = (trip) => {
  const myTripsDisplay = document.querySelector(".all-trip")
  let button = document.createElement("button")
  let p = document.createElement("p")
  let textNode = document.createTextNode(`${trip.date}`)
  button.appendChild(textNode)
  button.setAttribute("id", trip.tripID)
  button.setAttribute("class", `show-trip ${trip.status} ${trip.future}`)
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
  let tripID = event.target.id
  let tripsResults = getTrips().then((trips) => {
    return trips
  })
  let destinationsResults = getDestinations().then((destinations) => {
    return destinations
  })
  Promise.all([tripsResults, destinationsResults]).then((data) => {
    let trips = data[0].trips
    let destinations = data[1].destinations
    let tripData = combineTripAndDestination(trips, destinations, tripID)
    showTripData(tripData)
  })
}

function combineTripAndDestination(trips, destinations, tripID) {
  let clickedTrip = trips
    .filter((trips) => trips.userID === userID)
    .find((trip) => trip.id === Number(tripID))
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
  document.querySelector(".cost").textContent = `${tripData.totalCost}`
}

closeModal.addEventListener("click", () => {
  modalContainer.classList.remove("show")
})