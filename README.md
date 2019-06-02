### How to install ###
If you are using docker, follow the steps:
```
$ docker build . -t lufthansa-pdf:latest
$ docker run -p 8088:8088 lufthansa-pdf:latest npm start
```

Or on you host (you must have nodejs installed, developed with 10.15.3 version)
```
$ npm install
$ npm start
```

Or for development on your host (again with nodejs installed)
```
$ npm install
$ npm run dev
```

### Binary version ###

You can execute the scripts via shell using:
```
$ npm install
$ node binary <PATH_TO_XLSX_FILE> <PATH_TO_AIRBUS_PDF_FILE>
```

### To Do ###
1. Create windows executable for the binary.
