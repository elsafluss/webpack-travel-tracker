import {
  getDestinations,
  pushNewTrip
} from "./util.js"
// import {
//   showTripData
// } from "./dom-updates.js"

class Trip {
  constructor(newTrip) {
    ;(this.newTripID = Date.now()),
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

  matchWithDestinationData() {
    getDestinations()
      .then((destinations) => {
        let destinationData = destinations.destinations.find(
          (destination) => destination.destination === this.destination
        )
        console.log(destinationData)
        // destinationData undefined
        this.flightCost = destinationData.estimatedFlightCostPerPerson
        // error cant read prop estimated... of undefined
        this.lodgingCost = destinationData.estimatedLodgingCostPerDay
        this.image = destinationData.image
        this.alt = destinationData.alt
        this.destinationID = destinationData.id
        return destinationData
      })
      .then(() => {
        let tripObject = this.createTripObject()
        pushNewTrip(tripObject)
        // if POST was successful
        // showTripData(tripObject) 
        // use new function - showNewTrip
      })
      .catch((error) => console.log("error getting destinations", error))
  }

  createTripObject() {
    let tripObject = {
      id: this.newTripID,
      userID: this.userID,
      destinationID: this.destinationID,
      travelers: Number(this.travelers),
      date: this.date,
      duration: Number(this.duration),
      status: this.status,
      suggestedActivities: this.suggestedActivities,
    }
    return tripObject
  }
}

export const displayTrip = Trip.prototype.displayTrip
export default Trip