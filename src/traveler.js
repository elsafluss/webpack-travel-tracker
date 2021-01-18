class Traveler {
  constructor(traveler, trips, destinations) {
    (this.travelerID = traveler.id),
    (this.travelerName = traveler.name),
    (this.travelerType = traveler.travelerType),
    (this.trips = trips),
    (this.destinations = destinations),
    (this.totalSpent = 0 || this.totalSpent),
    (this.futureTrips = []),
    (this.pastTrips = []),
    (this.approved = []),
    (this.pending = [])
  }

  sortTrip(trip, traveler) {
    if (trip.status === "approved") {
      traveler.approved.push(trip)
    } else {
      traveler.pending.push(trip)
    }
  }

  catalogueTrip(trip, traveler) {
    let today = Date.now()
    if (new Date(trip.date) > new Date(today)) {
      trip.future = true
      traveler.futureTrips.push(trip)
    } else {
      trip.future = false
      traveler.pastTrips.push(trip)
    }
  }

  sortTripsByDate(date, userID) {
    let tripsData = this.trips.filter((trips) => {
      return trips.userID === userID && trips.date === date
    })
    return tripsData
  }
}

export const sortTrip = Traveler.prototype.sortTrip
// export const getMyTrips = Traveler.prototype.getMyTrips
export const catalogueTrip = Traveler.prototype.catalogueTrip
export default Traveler