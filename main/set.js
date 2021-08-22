const axios = require('axios');

const set = async input => {

  // Make request to API
  const res = await axios.post('https://gotiny.cc/api', { input })
  const data = res.data

  if (data.error) {

    // Send back error if found
    return data.error

  } else {

    const output = []

    // Loop through API response and create array with GoTiny objects
    data.forEach(doc => {

      output.push({
        long: doc.long,
        code: doc.code,
        tiny: `gotiny.cc/${doc.code}`,
        link: `https://gotiny.cc/${doc.code}`
      })

    })

    return output

  }

}

module.exports = set