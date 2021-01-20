import chai from "chai"
const expect = chai.expect
import Trip from '../src/trip'

describe("Trip", () => {
  let trip, newTrip

  beforeEach(() => {
    newTrip = {
      userID: 1,
      date: "2020/05/28",
      duration: 4,
      travelers: 6,
      destination: "Banff, Canada"
    }
    trip = new Trip(newTrip)
  })

  it("should be an instance of Trip class", () => {
    expect(trip).to.be.a.instanceof(Trip)
  })

  it("should return a trip object", () => {
    let result = trip.createTripObject(newTrip)
    result.id = 3 // id is usually created based on Date.now()
    expect(result).to.deep.equal({
      id: 3,
      userID: 1,
      destinationID: undefined,
      travelers: 6,
      date: "2020/05/28",
      duration: 4,
      status: "pending",
      suggestedActivities: [],
    })
  })
})