# VSTS Follower : Chrome Extention

## How to make an exsention for Chrome

### Build your app
1. Create your app as a manifest.json file. You can do this in a text editor like Notepad on Windows or TextMate on Mac creating a .txt file, and saving it as manifest.json. Save the file in a folder on your desktop. Title the folder the name of your app.
2. Create a 128px by 128px logo for your app. Name the file 128.png and put it in the same folder as the manifest.json file.
3. Host your the JSON file and logo on App Engine or your own web server.

> For example, you can host your file on a Google Site, corporate web server, or App Engine. 
Note that App Engine hosting is free for all types of G Suite users as long as you stay below their [usage quotas](https://developers.google.com/appengine/docs/quotas). 

Sample manifest.json
``` json
{
  "manifest_version": 2,
  "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
  "name": "ALM Follower",
  "description": "Follow your projects on VSTS with SonarQube",
  "version": "1.0",
  "icons": {
    "128": "128.png"
  },
  "browser_action": {
    "default_popup": "index.html"
  },
  "permissions": [
    "notifications",
    "webRequest",
    "alarms"
  ]
}
``` 

### Test your app
1. open [Extensions form](chrome://extensions/) on your Chrome.
2. Click Developer mode > Load unpacked extensions...
3. Browse to and Select the folder where your manifest.json file is and logo.
> If your file doesn't immediately load, check to make sure the JSON code is formatted correctly with the [JSON Validator](http://jsonlint.com/).
4. Open a new tab in Chrome to see if your app loads and functions correctly. If not, tweak it and test it until it's working correctly in your browser.

### Other steps
All steps are on [Google Help Page](https://support.google.com/chrome/a/answer/2714278?hl=en).

## Application

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
