# GoTiny SDK

SDK for GoTiny: A lightweight link shortener API

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Automatic URL Parsing](#automatic-url-parsing)
- [About GoTiny Links](#about-gotiny-links)
- [Privacy](#privacy)
- [License](#license)

## Installation

```console
npm install gotiny
```

## Usage

To create a new GoTiny link, the long url as an argument in the `gotiny.set()` function

```js
const gotiny = require("gotiny")

// Using Then

gotiny.set("https://amazon.com/very-long-url")
  .then(res => console.log(res))
  .catch(err => console.log(err))

// Using Async/Await

const getLink = async (input) => {

  try {
    const res = await gotiny.set(input)
    console.log(res)
  } catch (err) {
    console.log(err)
  }

}

getLink("https://amazon.com/very-long-url")
```

The response will always be an array of objects, each of which contains a tiny link, formatted in different ways.

- **long**: The original url that was used to create the GoTiny link
- **code**: The short code used to identify the GoTiny link
- **tiny**: The short link created by GoTiny
- **link**: The short link created by GoTiny, prefixed by the http-protocol

Example response:

```js
// gotiny.set("https://amazon.com/very-long-url")

[
  {
    long: "https://amazon.com/very-long-url",
    code: "y68hxc",
    tiny: "gotiny.cc/y68hxc",
    link: "https://gotiny.cc/y68hxc",
  },
];
```

Note that you’re not required to use the `long` attribute in your code. GoTiny will automatically resolve the short link in the users web browser to point to the original url.

## Automatic URL Parsing

GoTiny automatically filters URLs from the user input. This way, you as a developer won't have to provide a clean link, but can just feed an entire paragraph into GoTiny. It will create a short url from every url that it finds and include it in the response array.

Example response:

```js
// gotiny.set("The top 3 most popular websites are youtube.com, www.google.com and apple.com.")

[
  {
    long: "youtube.com",
    code: "86df6c",
    tiny: "gotiny.cc/86df6c",
    link: "https://gotiny.cc/86df6c",
  },
  {
    long: "www.google.com",
    code: "6wrsnf",
    tiny: "gotiny.cc/6wrsnf",
    link: "https://gotiny.cc/6wrsnf",
  },
  {
    long: "apple.com",
    code: "c56ned",
    tiny: "gotiny.cc/c56ned",
    link: "https://gotiny.cc/c56ned",
  },
];
```

## About GoTiny Links
The unique links that GoTiny generates are always 16 characters long, including the domain name. GoTiny links are all lowercase and don't include characters that could be confused with each other (e.g. o/0 or 1/i/l).

## Privacy
GoTiny does not collect, handle or store any user information.

## License

[MIT](LICENSE)
