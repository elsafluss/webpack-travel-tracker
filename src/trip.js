class Trip {
  constructor(newTrip) {
    this.id = newTrip.id,
    this.userID = newTrip.userID,
    this.destinationID = newTrip.destinationID,
    this.travelers = newTrip.travelers,
    this.date = newTrip.date,
    this.duration = newTrip.duration,
    this.status = newTrip.status,
    this.suggestedActivities = []
  }

  displayTrip() {
    console.log("displayTrip")
  }
}
export default Trip