## Introduction
Getir assignment with Post endpoint to filter document


## Demo app is hosted on Heroku
https://assignment-getir.herokuapp.com

### Post request
```bash
curl --location --request POST 'https://assignment-getir.herokuapp.com' \
--header 'Content-Type: application/json' \
--data-raw '{
"startDate": "2016-01-26",
"endDate": "2018-02-02",
"minCount": 2700,
"maxCount": 3000
}'
```

## Running locally
```bash
npm install
npm run watch
```