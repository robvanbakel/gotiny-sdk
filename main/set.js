const axios = require("axios")

const set = async (payload) => {
  // Throw error if no input is provided
  if (!payload) {
    throw {
      source: "sdk",
      code: "missing-argument",
      message: "No input provided",
    }
  }

  if (typeof payload === "string") {
    payload = { input: payload }
  }

  // Make request to API
  const res = await axios.post("https://gotiny.cc/api", payload)
  const data = res.data

  if (data.error) {
    // Send back error if found
    throw data.error
  } else {
    const output = []

    // Loop through API response and create array with GoTiny objects
    data.forEach((doc) => {
      output.push({
        long: doc.long,
        code: doc.code,
        tiny: `gotiny.cc/${doc.code}`,
        link: `https://gotiny.cc/${doc.code}`,
      })
    })

    return output
  }
}

module.exports = set
