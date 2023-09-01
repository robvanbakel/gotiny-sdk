import axios from "axios";

interface GoTinyObject {
  long: string;
  code: string;
}

export interface ReturnObject extends GoTinyObject {
  tiny: string;
  link: string;
}

export interface InputObject {
  long: string;
  custom?: string;
  useFallback?: boolean;
}

const set = async (input: InputObject | InputObject["long"]): Promise<ReturnObject[]> => {
  // Throw error if no input is provided
  if (!input) {
    throw {
      source: "sdk",
      code: "missing-argument",
      message: "No input provided",
    };
  }

  // Convert input to object if necessary
  const payload = typeof input === "string" ? { input } : input;

  // Make request to API
  const res = await axios.post("https://gotiny.cc/api", payload);
  const { data } = res;

  if (data.error) {
    // Send back error if found
    throw data.error;
  } else {
    const output: ReturnObject[] = [];

    // Loop through API response and create array with GoTiny objects
    data.forEach(({long, code}: GoTinyObject) => {
      output.push({
        long,
        code,
        tiny: `gotiny.cc/${code}`,
        link: `https://gotiny.cc/${code}`,
      });
    });

    return output;
  }
};

export default set;
