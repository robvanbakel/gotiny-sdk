# GoTiny SDK

SDK for GoTiny: A lightweight link shortener API

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Create GoTiny link](#create-gotiny-link)
    - [Automatic URL Parsing](#automatic-url-parsing)
    - [Options](#options)
  - [Resolve GoTiny link](#resolve-gotiny-link)
- [About GoTiny Links](#about-gotiny-links)
- [Privacy](#privacy)
- [License](#license)
- [Other Repositories](#other-repositories)

## Installation

```console
npm install gotiny
```

## Usage

### Create GoTiny link

To create a new GoTiny link, pass the long url as an argument in the `gotiny.set()` function.

```js
const gotiny = require("gotiny")

// Using Then

gotiny.set("https://amazon.com/very-long-url")
  .then(res => console.log(res))
  .catch(err => console.log(err))

// Using Async/Await

const createShortLink = async (input) => {

  try {
    const res = await gotiny.set(input)
    console.log(res)
  } catch (err) {
    console.log(err)
  }

}

createShortLink("https://amazon.com/very-long-url")
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
]
```

#### Automatic URL Parsing

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

Note that you’re not required to use the `long` attribute in your code. GoTiny will automatically resolve the short link in the users web browser to point to the original url.

#### Options

Options are provided by passing an object to the `gotiny.set()` function. The object should have a `long` key with the long link as a value, as wel as any of the supported options. Options currently supported are:

| Key           | Type    | Description                                                                                 |
| :------------ | :------ | :------------------------------------------------------------------------------------------ |
| `custom`      | string  | Generates a custom link (e.g. `gotiny.cc/custom-link`). Custom codes should consist of 4-32 lowercase letters, numbers, `-` and/or `_` symbols.  |
| `useFallback` | boolean | Set to `false` if you don't want to use a randomly generated 6-character fallback code and throw an error instead when a custom code can't be used. |

To generate multiple links at once, you can pass an array of objects in to the `gotiny.set()` function.

```js
gotiny.set({
  long: "https://amazon.com/very-long-url", 
  custom: "amazon", // generate gotiny.cc/amazon
  useFallback: false // don't use randomly generated code when "amazon" can't be used
})
  .then(res => console.log(res))
  .catch(err => console.log(err))
```

### Resolve GoTiny link

To resolve a GoTiny link, pass the link as an argument in the `gotiny.get()` function. The full link will return as plain text.

```js
const gotiny = require("gotiny")

gotiny.get("https://gotiny.cc/y68hxc")
  .then(res => console.log(res)) // https://amazon.com/very-long-url
  .catch(err => console.log(err))
```

Add an object with an `extended` key set to `true` as a second argument to return a more detailed object.

```js
const gotiny = require("gotiny")

gotiny.get("https://gotiny.cc/y68hxc" , { extended: true })
  .then(res => console.log(res)) // { code: 'y68hxc', long: 'https://amazon.com/very-long-url' }
  .catch(err => console.log(err))
```

Alternatively, you can omit the http-protocol or pass just the GoTiny code to the `gotiny.get()` function.

## About GoTiny Links
The unique links that GoTiny generates are always 16 characters long, including the domain name. GoTiny links are all lowercase and don't include characters that could be confused with each other (e.g. o/0 or 1/i/l).

## Privacy
GoTiny does not collect, handle or store any user information.

## License

[MIT](LICENSE)

## Other Repositories

- [robvanbakel/gotiny-api](https://github.com/robvanbakel/gotiny-api)
- [robvanbakel/gotiny-website](https://github.com/robvanbakel/gotiny-website)
- [robvanbakel/gotiny-discord-bot](https://github.com/robvanbakel/gotiny-discord-bot)
