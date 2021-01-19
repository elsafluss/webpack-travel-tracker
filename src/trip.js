import {
  calculateLodgingCost,
  calculateFlightCost
} from "./data-manip.js"
import {
  displayTrips
} from "./dom-updates.js"
import {
  getDestinations,
  pushNewTrip,
  saveToLocalStorage,
  getFromLocalStorage,
} from "./util.js"

class Trip {
  constructor(newTrip) {
    (this.newTripID = Date.now()),
    (this.userID = newTrip.userID),
    (this.destination = newTrip.destination),
    (this.travelers = newTrip.travelers),
    (this.date = newTrip.date),
    (this.duration = newTrip.duration),
    (this.destinationID = newTrip.destinationID || 0),
    (this.flightCost = newTrip.flightCost || 0),
    (this.lodgingCost = newTrip.lodgingCost || 0),
    (this.totalCost = newTrip.totalCost || 0),
    (this.image = newTrip.image || ""),
    (this.alt = newTrip.alt || ""),
    (this.status = "pending"),
    (this.future = true),
    (this.suggestedActivities = newTrip.suggestedActivities || [])
  }

  matchWithDestinationData(newTrip) {
    getDestinations()
      .then((destinations) => {
        const destinationData = destinations.destinations.find((destination) => {
          return destination.destination === newTrip.destination
        })
        newTrip.flightCost = destinationData.estimatedFlightCostPerPerson
        newTrip.lodgingCost = destinationData.estimatedLodgingCostPerDay
        newTrip.image = destinationData.image
        newTrip.alt = destinationData.alt
        newTrip.destinationID = destinationData.id
        newTrip.post = this.createTripObject(newTrip)
        const totalCost =
          calculateLodgingCost(newTrip) + calculateFlightCost(newTrip)
        newTrip.totalCost = totalCost.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
        saveToLocalStorage(newTrip)
        return newTrip
      })
      .catch((error) => console.log("error getting destinations", error))
  }

  createTripObject(newTrip) {
    let tripObject = {
      id: this.newTripID,
      userID: this.userID,
      destinationID: newTrip.destinationID,
      travelers: Number(this.travelers),
      date: this.date,
      duration: Number(this.duration),
      status: this.status,
      suggestedActivities: this.suggestedActivities,
    }
    return tripObject
  }

  pushTripToAPI() {
    let savedTrip = getFromLocalStorage()
    console.log(savedTrip)
    pushNewTrip(savedTrip.post).catch((error) =>
      console.log("error posting trip", error)
    )
    displayTrips(savedTrip)
    return savedTrip
  }
}

export const pushTripToAPI = Trip.prototype.pushTripToAPI
export default Trip