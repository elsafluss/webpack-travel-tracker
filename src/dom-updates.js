import {
  getDestinations,
  getTrips
} from "./util.js"
import {
  userID
} from "./index.js"

export const displayUserName = (traveler) => {
  const myNameDisplay = document.querySelector(".traveler-name")
  myNameDisplay.innerText = traveler.name
  return traveler.id
}

export const displayTrips = (trip) => {
  const myTripsDisplay = document.querySelector(".all-trip")
  let button = document.createElement("button")
  let p = document.createElement("p")
  let textNode = document.createTextNode(`${trip.date}`)
  button.appendChild(textNode)
  button.setAttribute('id', trip.id)
  button.setAttribute("class", 'show-trip')
  myTripsDisplay.appendChild(button)
  myTripsDisplay.appendChild(p)
}

export const fillDestinationList = (destinationData) => {
  let sortedByName = destinationData.sort((a, b) => {
    if (a.destinationName < b.destinationName) {
      return -1
    }
  })
  let listOfDestinationNames = sortedByName.map(
    (destination) => destination.destinationName
  )
  listOfDestinationNames.forEach(function (destination) {
    let opt = document.createElement("option")
    opt.innerHTML = destination
    opt.value = destination
    document.querySelector(".choose-destination").appendChild(opt)
  })
  return listOfDestinationNames
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
    let trips = data[0]
    let destinations = data[1].destinations
    let thisUsersTrips = trips.trips.filter((trips) => trips.userID === userID)
    let clickedTrip = thisUsersTrips.find((trip) => trip.id === Number(tripID))
    if (clickedTrip) {
      let showThisDestination = destinations
        .find(destination => destination.id = clickedTrip.destinationID)
      console.log(showThisDestination.destination)
    } 
  })
}
// take clickedTrip.destinationID to destinations and display the destination.