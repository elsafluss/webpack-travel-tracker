/* eslint-disable max-len */
const userID = 3
import './css/base.scss';
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

const myNameDisplay = document.querySelector('.traveler-name')
const myTripsDisplay = document.querySelector('.one-trip')

window.onload = onStartup()

function onStartup() {
  const travelersResults = getTravelers()
    .then((travelers) => {
      //   console.log(travelers)
    })
    .catch((error) => console.log(error))
  const travelerResults = getATraveler(userID) // pass in traveler's id
    .then((traveler) => {
      myNameDisplay.innerText = traveler.name
    })
    .catch((error) => console.log(error))
  const tripsResults = getTrips()
    .then((trips) => {
      // console.log('LIST OF ALL TRIPS', trips.trips)
      // console.log('keys', Object.keys(trips))
      let theseTrips = trips.trips.filter(trips => trips.userID === userID)
        .map(trip => trip.date)
      theseTrips.forEach(trip => {
        let node = document.createElement('p')
        let textNode = document.createTextNode(`${trip}`)
        node.appendChild(textNode)
        myTripsDisplay.appendChild(node)
      })
        
    })
    .catch((error) => console.log(error))
  const destinationsResults = getDestinations()
    // .then((destination) => console.log(destination))
    .catch((error) => console.log(error))
}

