class Trip {
  constructor(newTrip) {
    // this.id = newTrip.id,
    this.userID = newTrip.userID,
    (this.destinationName = newTrip.selectedDestination),
      (this.travelers = newTrip.selectedGroupSize),
      (this.date = newTrip.selectedDate),
      (this.duration = newTrip.selectedLength)
    //   (this.status = newTrip.status),
    //   (this.suggestedActivities = [])
  }

  displayTrip() {
    console.log("displayTrip")
  }
}
export default Trip