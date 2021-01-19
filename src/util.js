export const getTravelers = () => {
  return fetch("http://localhost:3001/api/v1/travelers")
    .then(response => response.json())
}

export const getATraveler = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => response.json())
}

export const getTrips = () => {
  return fetch('http://localhost:3001/api/v1/trips')
    .then((response) => response.json())
}

export const getDestinations = () => {
  return fetch("http://localhost:3001/api/v1/destinations")
    .then((response) => response.json())
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
}

export const saveToLocalStorage = (data) => {
  localStorage.setItem('saved trip', JSON.stringify(data))
}

export const getFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('saved trip'))
}