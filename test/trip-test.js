/* eslint-disable max-len */
import chai from "chai"
const expect = chai.expect
import Trip from "../src/trip"

describe("Trip", () => {
  let trip

  beforeEach(() => {
    trip = new Trip()
  })

  it.only("should be an instance of Trip class", () => {
    console.log(trip)
    expect(trip).to.be.a.instanceof(Trip)
  })

  //   it("should sort trips by pending or approved", () => {
  //     let result = traveler1.sortMyTrips("pending", 2)
  //     let result1 = traveler1.sortMyTrips("approved", 2)
  //     expect(result).to.deep.equal([
  //       {
  //         id: 35,
  //         userID: 2,
  //         destinationID: 25,
  //         travelers: 5,
  //         date: "2020/10/04",
  //         duration: 18,
  //         status: "pending",
  //         suggestedActivities: [],
  //       },
  //     ])
  //     expect(result1).to.deep.equal([
  //       {
  //         id: 40,
  //         userID: 2,
  //         destinationID: 14,
  //         travelers: 2,
  //         date: "2020/02/25",
  //         duration: 10,
  //         status: "approved",
  //         suggestedActivities: [],
  //       },
  //     ])
  //   })

  //   it("should get trips by date", () => {
  //     let result = traveler1.sortTripsByDate("2020/10/04", 2)
  //     let result1 = traveler1.sortTripsByDate("2020/10/05", 2)
  //     expect(result).to.deep.equal([
  //       {
  //         id: 35,
  //         userID: 2,
  //         destinationID: 25,
  //         travelers: 5,
  //         date: "2020/10/04",
  //         duration: 18,
  //         status: "pending",
  //         suggestedActivities: [],
  //       },
  //     ])
  //     expect(result1).to.deep.equal([])
  //   })

  //   it("should catalogue this user's trips by past or future", () => {
  //     traveler1.catalogueTrips(1)
  //     expect(traveler1.pastTrips).to.deep.equal([
  //       {
  //         id: 13,
  //         userID: 1,
  //         destinationID: 22,
  //         travelers: 4,
  //         date: "2020/05/22",
  //         duration: 17,
  //         status: "pending",
  //         suggestedActivities: [],
  //       },
  //     ])
  //     expect(traveler1.futureTrips).to.deep.equal([
  //       {
  //         id: 44,
  //         userID: 1,
  //         destinationID: 49,
  //         travelers: 1,
  //         date: "2021/09/16",
  //         duration: 8,
  //         status: "approved",
  //         suggestedActivities: [],
  //       },
  //     ])
  //   })

//   it("should get this user's trips", () => {
//     let result = traveler1.getMyTrips(1)
//     expect(result).to.deep.equal([
//       {
//         id: 44,
//         userID: 1,
//         destinationID: 49,
//         travelers: 1,
//         date: "2021/09/16",
//         duration: 8,
//         status: "approved",
//         suggestedActivities: [],
//       },
//       {
//         id: 13,
//         userID: 1,
//         destinationID: 22,
//         travelers: 4,
//         date: "2020/05/22",
//         duration: 17,
//         status: "pending",
//         suggestedActivities: [],
//       },
//     ])
//   })
})
