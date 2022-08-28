import axios from "axios";

export interface Options {
  extended?: boolean;
}

const get = async (input: string, opt: Options = {}) => {
  // If full link is provided, filter code out of it
  const fullLinkRegex = /gotiny.cc\/(.{4,32})/;

  let code = input;

  const regexResponse = input.match(fullLinkRegex);

  if (regexResponse) {
    code = regexResponse[1];
  }

  const requestURL = new URL(`https://gotiny.cc/api/${code}`);

  // If extended option is present, add corresponding query params
  if (opt.extended) {
    requestURL.searchParams.set("format", "json");
  }

  // Make request to API
  try {
    const res = await axios.get(requestURL.href);
    return res.data;
  } catch (err) {
    throw {
      source: "sdk",
      code: "not-found",
      message: "GoTiny link not found",
    };
  }
};

export default get;
