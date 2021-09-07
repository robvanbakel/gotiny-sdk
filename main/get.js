const axios = require("axios")

const get = async (input) => {
  
  let code = null

  // Filter GoTiny code from input

  const fullLinkRegex = /gotiny.cc\/(.{6})/

  if (input.length === 6) {

    code = input

  } else if (fullLinkRegex.test(input)) {

    const regexRes = input.match(fullLinkRegex)
    code = regexRes[1]

  }

  // Make request to API

  try {

    const res = await axios.get("https://gotiny.cc/api/" + code)
    return res.data

  } catch (err) {

    throw {
      source: 'sdk',
      code: 'not-found',
      message: 'GoTiny link not found',
    }

  }
}

module.exports = get
