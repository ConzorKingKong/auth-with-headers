/**
 * Replace these values with your preshared auth header key and value
 * @param {string} presharedAuthHeaderKey
 * @param {string} presharedAuthHeaderValue
 */
const presharedAuthHeaderKey = 'X-Custom-PSK'
const presharedAuthHeaderValue = 'mypresharedkey'

/**
 * Passes your request forward if auth headers are right
 * @param {Request} request
 */
async function verifyRequest(request) {
  let psk = request.headers.get(presharedAuthHeaderKey)

  if (psk === presharedAuthHeaderValue) {
    // Correct preshared header key supplied. Forwarding request
    return fetch(request)
  } else {
    // Incorrect preshared header key supplied. Rejecting request
    return new Response('Sorry, you have supplied an invalid key.', {
      status: 403,
      statusText: 'Forbidden',
    })
  }
}

addEventListener('fetch', event => {
  event.respondWith(verifyRequest(event.request))
})
