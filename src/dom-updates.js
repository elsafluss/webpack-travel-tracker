export const displayUserName = (traveler) => {
  const myNameDisplay = document.querySelector(".traveler-name")
  myNameDisplay.innerText = traveler.name
}

export const displayTrips = (trip) => {
  const myTripsDisplay = document.querySelector(".all-trip")
  let button = document.createElement("button")
  let p = document.createElement("p")
  let textNode = document.createTextNode(`${trip} `)
  button.appendChild(textNode)
  myTripsDisplay.appendChild(button)
  myTripsDisplay.appendChild(p)
}

export const fillDestinationList = (destinationData) => {
  let sortedByName = destinationData.sort((a, b) => {
    if (a.destinationName < b.destinationName) {
      return -1
    }
  })
  let listOfDestinationNames = sortedByName.map(
    (destination) => destination.destinationName
  )
  listOfDestinationNames.forEach(function (destination) {
    let opt = document.createElement("option")
    opt.innerHTML = destination
    opt.value = destination
    document.querySelector(".choose-destination").appendChild(opt)
  })
  return listOfDestinationNames
}