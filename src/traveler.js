class Traveler {
  constructor(traveler, trips, destinations, userID) {
    (this.travelerID = userID),
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
    return traveler.approved
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
    return traveler.futureTrips
  }

  sortTripsByDate(date, userID) {
    let tripsData = this.trips.filter((trips) => {
      return trips.userID === userID && trips.date === date
    })
    return tripsData
  }

  calculateAnnualSpend(currentTraveler) {
    let currentYear = new Date()
    let annualSpend = currentTraveler.trips.reduce((total, value) => {
      let tripDate = new Date(value.date)
      if (tripDate.getFullYear() === currentYear.getFullYear() - 1) {
        total += value.totalCost
      }
      return total
    }, 0)
    document.querySelector(".total-spent")
      .textContent = annualSpend.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })
    return annualSpend
  }
}

export const sortTrip = Traveler.prototype.sortTrip
export const catalogueTrip = Traveler.prototype.catalogueTrip
export const calculateAnnualSpend = Traveler.prototype.calculateAnnualSpend
export default Traveler