# Hashtags app
> Easilly follow any hashtag

## Install

### Prerequisites
- Installation and **fair knowledge** of:
- node & npm - http://nodejs.org/download/
  - yo: `npm install --global yo` - http://yeoman.io/
  - gulp: `npm install --global gulp` - http://gulpjs.com/
  - bower: `npm install --global bower` - http://bower.io/
- Sass http://sass-lang.com/
  - no need to install in `> v1.1.0` since we're using [gulp-sass](https://github.com/dlmanning/gulp-sass) from now on
- Want to test or run your app on a device ? Then you'll need:
  - Platform SDKs for cordova. Head over to cordova documentation: [Platform Guides](http://cordova.apache.org/docs/en/edge/guide_platforms_index.md.html#Platform%20Guides) or cordova cli: [Requirements](https://github.com/apache/cordova-cli/)

## Get started

### After git clone
Since all these files are excluded from git, you need to install all of them when you start with a fresh clone of your project. In order to do so, run the following commands in that order:
```sh
npm install # installs all node modules including cordova, gulp and all that
bower install # install all bower components including angular, ionic, ng-cordova, ...
gulp --cordova 'prepare' # install all cordova platforms and plugins from the config.xml
```

### gulp watch
Prepares everything for development and opens your default browser. Get ready to start coding!
```sh
gulp watch
```
Livereloads your application when changing/adding/deleting files to immediately reflect the changes you make. If you don't want this task to open your browser, just add the `--no-open` option and navigate to `http://localhost:9000` yourself. For your convenience any occurring **jscs, jshint or jsonlint errors** will be presented to you on every livereload.

### Build on device
Run this to build the project on your devie
```sh
gulp --cordova "run android"
```

## License
This work is licensed under a [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](http://creativecommons.org/licenses/by-nc-nd/4.0/).

So basically you can build this for yourself and enjoy.
