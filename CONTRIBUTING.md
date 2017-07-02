# Contributing
## Prerequisites

[Node.js](http://nodejs.org/) must be installed.

## Installation

* Running `npm install` will install everything you need for development.

## Running Tests

* `ng test` will run the tests once.

## Building

* `ng build` will build the extension for publishing to npm.
* `npm build --watch` will build the extension continuously.

## Test your app
1. open [Extensions form](chrome://extensions/) on your Chrome.
2. Click Developer mode > Load unpacked extensions...
3. Browse to and Select the folder where your manifest.json file is and logo.
> If your file doesn't immediately load, check to make sure the JSON code is formatted correctly with the [JSON Validator](http://jsonlint.com/).
4. Open a new tab in Chrome to see if your app loads and functions correctly. If not, tweak it and test it until it's working correctly in your browser.
