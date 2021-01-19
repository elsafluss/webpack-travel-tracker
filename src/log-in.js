export const checkCredentials = () => {
  let username = document.querySelector('.username').value
  let password = document.querySelector(".password").value

  if (username.includes('username')) {
    let userID = username.slice(-2)
    console.log("ooooo", username)
    console.log("ooooo", userID)
    // check password
  } else {
    // do an alert
  }
}