/* eslint-disable max-len */
class Traveler {
  constructor(travelerID, travelerName, travelerType,
    trips, destinations, totalSpent) {
    this.travelerID = travelerID,
    this.travelerName = travelerName,
    this.travelerType = travelerType,
    this.trips = trips,
    this.destinations = destinations,
    this.totalSpent = totalSpent
  }

  sortMyTrips(type, userID) { // return pending or approved trips
    let tripsData = this.trips
      .filter((trips) => {
        return (trips.userID === userID) && (trips.status === type)
      })
    return tripsData
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