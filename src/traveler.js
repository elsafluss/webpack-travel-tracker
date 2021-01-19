class Traveler {
  constructor(
    travelerID,
    travelerName,
    travelerType,
    trips,
    destinations,
    totalSpent
  ) {
    (this.travelerID = travelerID),
    (this.travelerName = travelerName),
    (this.travelerType = travelerType),
    (this.trips = trips),
    (this.destinations = destinations),
    (this.totalSpent = totalSpent),
    (this.futureTrips = []),
    (this.pastTrips = []),
    (this.approved = []),
    (this.pending = [])
  }

  getMyTrips(traveler) {
    let myTrips = traveler.trips.filter((trips) => {
      return trips.userID === traveler.userID
    })
    sortMyTrips(traveler)
    catalogueTrips(traveler)
    return myTrips
  }

  sortMyTrips(traveler) {
    traveler.trips.filter((trip) => {
      if (trip.userID === traveler.travelerID && trip.status === "approved") {
        traveler.approved.push(trip)
      } else {
        traveler.pending.push(trip)
      }
    })
  }

  catalogueTrips(traveler) {
    let today = Date.now()
    traveler.trips.filter((trip) => {
      if (new Date(trip.date) > new Date(today)) {
        trip.future = true
        traveler.futureTrips.push(trip)
      } else {
        trip.future = false
        traveler.pastTrips.push(trip)
      }
    })
  }

  sortTripsByDate(date, userID) {
    let tripsData = this.trips.filter((trips) => {
      return trips.userID === userID && trips.date === date
    })
    return tripsData
  }
}

export const sortMyTrips = Traveler.prototype.sortMyTrips
export const getMyTrips = Traveler.prototype.getMyTrips
export const catalogueTrips = Traveler.prototype.catalogueTrips
export default Traveler