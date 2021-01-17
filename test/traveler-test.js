/* eslint-disable max-len */
import chai from "chai"
const expect = chai.expect
import Traveler, { sortMyTrips } from '../src/traveler'

describe("Traveler", () => {

  let traveler1,
    traveler2,
    travelerID1,
    travelerID2,
    traveler1Name,
    traveler2Name,
    traveler1Type,
    traveler2Type,
    trips,
    destinations,
    totalSpent1,
    totalSpent2

  beforeEach(() => {
    (travelerID1 = 1),
    (travelerID2 = 2),
    (traveler1Name = "Wesley Crusher"),
    (traveler2Name = "Marco Polo"),
    (traveler1Type = "exotic"),
    (traveler2Type = "spicy"),
    (trips = [
      {
        id: 44,
        userID: 1,
        destinationID: 49,
        travelers: 1,
        date: "2019/09/16",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 35,
        userID: 2,
        destinationID: 25,
        travelers: 5,
        date: "2020/10/04",
        duration: 18,
        status: "pending",
        suggestedActivities: [],
      },
    ]),
    (destinations = [
      {
        id: 1,
        destination: "Lima, Peru",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image:
            "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        alt: "overview of city buildings with a clear sky",
      },
      {
        id: 2,
        destination: "Stockholm, Sweden",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 780,
        image:
            "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "city with boats on the water during the day time",
      },
    ]),
    (totalSpent1 = 420.69),
    (totalSpent2 = 694.2),
    (traveler1 = new Traveler(
      travelerID1,
      traveler1Name,
      traveler1Type,
      trips,
      destinations,
      totalSpent1
    )),
    (traveler2 = new Traveler(
      travelerID2,
      traveler2Name,
      traveler2Type,
      trips,
      destinations,
      totalSpent2
    ))
  })

  it("should be an instance of Traveler class", () => {
    expect(traveler1).to.be.a.instanceof(Traveler)
  })

  it("should sort trips by pending or approved", () => {
    let result = traveler1.sortMyTrips("pending", 2)
    let result1 = traveler1.sortMyTrips("approved", 2)
    expect(result).to.deep.equal([{
      id: 35,
      userID: 2,
      destinationID: 25,
      travelers: 5,
      date: "2020/10/04",
      duration: 18,
      status: "pending",
      suggestedActivities: [],
    }])
    expect(result1).to.deep.equal([])
  })

  it("should get trips by date", () => {
    let result = traveler1.sortTripsByDate("2020/10/04", 2)
    let result1 = traveler1.sortTripsByDate("2020/10/05", 2)
    expect(result).to.deep.equal([
      {
        id: 35,
        userID: 2,
        destinationID: 25,
        travelers: 5,
        date: "2020/10/04",
        duration: 18,
        status: "pending",
        suggestedActivities: [],
      },
    ])
    expect(result1).to.deep.equal([])
  })
})