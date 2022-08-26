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
    url: `http://localhost:8080/api/v1${url}`,
    data: data,
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
