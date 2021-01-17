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
    this.futureTrips = [],
    this.pastTrips = []
  }

  getMyTrips(userID) {
    let myTrips = this.trips.filter((trips) => {
      return trips.userID === userID
    })
    return myTrips
  }

  sortMyTrips(type, userID) {
    let tripsData = this.trips.filter((trips) => {
      return trips.userID === userID && trips.status === type
    })
    return tripsData
  }

  catalogueTrips(userID) {
    let myTrips = this.getMyTrips(userID)
    let today = Date.now()
    myTrips.filter(trip => {
      if (new Date(trip.date) > new Date(today)) {
        this.futureTrips.push(trip)
      } else {
        this.pastTrips.push(trip)
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
export default Traveler