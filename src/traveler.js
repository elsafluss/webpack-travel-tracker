/* eslint-disable max-len */
class Traveler {
  constructor(travelerID, travelerName, travelerType, trips, destinations, totalSpent) {
    this.travelerID = travelerID,
    this.travelerName = travelerName,
    this.travelerType = travelerType,
    this.trips = trips,
    this.destinations = destinations,
    this.totalSpent = totalSpent
  }

  sortMyTrips(trips, userID) {
    let tripsDates = trips.trips
      .filter((trips) => trips.userID === userID)
      .map((trip) => trip.date)
      .sort()
    return tripsDates
  }
}

export const sortMyTrips = Traveler.prototype.sortMyTrips
export default Traveler