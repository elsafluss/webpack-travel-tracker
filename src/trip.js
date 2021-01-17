import {
  getDestinations,
  pushNewTrip
} from "./util.js"

class Trip {
  constructor(newTrip) {
    (this.newTripID = Date.now()),
    (this.userID = newTrip.userID),
    (this.destinationName = newTrip.selectedDestination),
    (this.travelers = newTrip.selectedGroupSize),
    (this.date = newTrip.selectedDate),
    (this.duration = newTrip.selectedLength),
    (this.destinationID = 0),
    (this.flightCost = 0),
    (this.lodgingCost = 0),
    (this.totalCost = 0),
    (this.image = ""),
    (this.alt = ""),
    (this.status = "pending"),
    (this.suggestedActivities = [])
  }

  displayTrip(
      
  ) {}

  matchWithDestinationData() {
    getDestinations()
      .then((destinations) => {
        let destinationData = destinations.destinations.find(
          (destination) => destination.destination === this.destinationName
        )
        this.flightCost = destinationData.estimatedFlightCostPerPerson
        this.lodgingCost = destinationData.estimatedLodgingCostPerDay
        this.image = destinationData.image
        this.alt = destinationData.alt
        this.destinationID = destinationData.id
        return destinationData
      })
      .then(() => {
        let tripObject = this.createTripObject()
        pushNewTrip(tripObject)
        displayTrip()
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