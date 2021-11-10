const axios = require("axios")

const set = async (input, opt) => {
  if (input?.replace(/\s/g, "") === "") {
    throw {
      source: "sdk",
      code: "missing-argument",
      message: "Empty string provided",
    }
  }

  if (!input) {
    throw {
      source: "sdk",
      code: "missing-argument",
      message: "No string provided",
    }
  }

  // Make request to API
  const res = await axios.post("https://gotiny.cc/api", { input, ...opt })
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
