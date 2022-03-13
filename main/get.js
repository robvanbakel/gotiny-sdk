const axios = require('axios');

const get = async (input, opt = {}) => {
  // If full link is provided, filter code out of it
  const fullLinkRegex = /gotiny.cc\/(.{4,32})/;

  let code = input;

  if (fullLinkRegex.test(input)) {
    [, code] = input.match(fullLinkRegex);
  }

  const requestURL = new URL(`https://gotiny.cc/api/${code}`);

  // If extended option is present, add corresponding query params
  if (opt.extended) {
    requestURL.searchParams.set('format', 'json');
  }

  // Make request to API
  try {
    const res = await axios.get(requestURL.href);
    return res.data;
  } catch (err) {
    throw {
      source: 'sdk',
      code: 'not-found',
      message: 'GoTiny link not found',
    };
  }
};

module.exports = get;
