import chai from "chai"
const expect = chai.expect
import Traveler from '../src/traveler'

describe("Traveler", () => {

  let traveler1,
    travelerID1,
    traveler1Name,
    traveler1Type,
    trips,
    destinations,
    totalSpent1

  beforeEach(() => {
    (travelerID1 = 1),
    (traveler1Name = "Wesley Crusher"),
    (traveler1Type = "exotic"),
    (trips = [{
      id: 44,
      userID: 1,
      destinationID: 49,
      travelers: 1,
      date: "2021/09/16",
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
    {
      id: 13,
      userID: 1,
      destinationID: 22,
      travelers: 4,
      date: "2020/05/22",
      duration: 17,
      status: "pending",
      suggestedActivities: [],
    },
    {
      id: 40,
      userID: 2,
      destinationID: 14,
      travelers: 2,
      date: "2020/02/25",
      duration: 10,
      status: "approved",
      suggestedActivities: [],
    },
    ]),
    (destinations = [{
      id: 1,
      destination: "Lima, Peru",
      estimatedLodgingCostPerDay: 70,
      estimatedFlightCostPerPerson: 400,
      image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
      alt: "overview of city buildings with a clear sky",
    },
    {
      id: 2,
      destination: "Stockholm, Sweden",
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 780,
      image: "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      alt: "city with boats on the water during the day time",
    }
    ]),
    (totalSpent1 = 420.69),
    (traveler1 = new Traveler(
      travelerID1,
      traveler1Name,
      traveler1Type,
      trips,
      destinations,
      totalSpent1
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
    expect(result1).to.deep.equal([{
      id: 40,
      userID: 2,
      destinationID: 14,
      travelers: 2,
      date: "2020/02/25",
      duration: 10,
      status: "approved",
      suggestedActivities: [],
    }, ])
  })

  it("should get trips by date", () => {
    let result = traveler1.sortTripsByDate("2020/10/04", 2)
    let result1 = traveler1.sortTripsByDate("2020/10/05", 2)
    expect(result).to.deep.equal([{
      id: 35,
      userID: 2,
      destinationID: 25,
      travelers: 5,
      date: "2020/10/04",
      duration: 18,
      status: "pending",
      suggestedActivities: [],
    }, ])
    expect(result1).to.deep.equal([])
  })

  it("should catalogue this user's trips by past or future", () => {
    traveler1.catalogueTrips(1)
    expect(traveler1.pastTrips).to.deep.equal([{
      id: 13,
      userID: 1,
      destinationID: 22,
      travelers: 4,
      date: "2020/05/22",
      duration: 17,
      status: "pending",
      suggestedActivities: [],
    }, ])
    expect(traveler1.futureTrips).to.deep.equal([{
      id: 44,
      userID: 1,
      destinationID: 49,
      travelers: 1,
      date: "2021/09/16",
      duration: 8,
      status: "approved",
      suggestedActivities: [],
    }, ])
  })

  it("should get this user's trips", () => {
    let result = traveler1.getMyTrips(1)
    expect(result).to.deep.equal([{
      id: 44,
      userID: 1,
      destinationID: 49,
      travelers: 1,
      date: "2021/09/16",
      duration: 8,
      status: "approved",
      suggestedActivities: [],
    }, {
      id: 13,
      userID: 1,
      destinationID: 22,
      travelers: 4,
      date: "2020/05/22",
      duration: 17,
      status: "pending",
      suggestedActivities: [],
    }])
  })
})