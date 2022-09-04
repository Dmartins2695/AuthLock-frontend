const axios = require('axios').default

export const makeRequestLogin = ({ method, data, url, callbackResponse, callbackError }) => {

  const deliverCallBackResponse = (response) => {
    callbackResponse(response)
  }

  const deliverCallBackError = (error) => {
    callbackError(error)
  }

  axios({
    method: method,
    url: `https://localhost:8443/api/v1${url}`,
    data: data,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      deliverCallBackResponse(response)
    })
    .catch((error) => {
      deliverCallBackError(error)
    })
}
