const axios = require("axios")

const get = async (code) => {
  // If full link is provided, filter code out of it
  const fullLinkRegex = /gotiny.cc\/(.{4,32})/

  if (fullLinkRegex.test(code)) {
    code = code.match(fullLinkRegex)[1]
  }

  // Make request to API

  try {
    const res = await axios.get("https://gotiny.cc/api/" + code)
    return res.data
  } catch (err) {
    throw {
      source: "sdk",
      code: "not-found",
      message: "GoTiny link not found",
    }
  }
}

module.exports = get
