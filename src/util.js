export const getTravelers = () => {
  return fetch("http://localhost:3001/api/v1/travelers")
    .then(response => response.json())
    .then(data => data)   
}

export const getATraveler = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => response.json())
    .then(data => data)
}

export const getTrips = () => {
  return fetch('http://localhost:3001/api/v1/trips')
    .then((response) => response.json())
    .then((data) => data)
}

export const getDestinations = () => {
  return fetch("http://localhost:3001/api/v1/destinations")
    .then((response) => response.json())
    .then((data) => data)
}

export const pushNewTrip = (tripObject) => {
  return fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tripObject),
  })
    .then((response) => response.json())
    .then((response) => console.log(response))
    .then((data) => data)
    .catch((error) => console.log("error posting trip", error))
}