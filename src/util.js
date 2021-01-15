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