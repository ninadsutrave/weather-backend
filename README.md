<<<<<<< HEAD
# MidDay Weather Application

## Description

As the name suggests, it is any easy to use weather web application, that can be used to fetch the real time weather information of any place on earth.

Get the following information of the place you search:
✓ Time

✓ Date

✓ Temperature

✓ Feels Like Temperature

✓ Wind Speed

✓ Humidity

✓ Precipitation

## Preview

![Demonstration](./src/assets/demo.gif)

## Try it out?

https://midday.netlify.app

Make sure to drop me a comment when you do! :)
=======
# Weather App REST API

## Description

A REST API to retrieve the real time weather information of a location or coordinates provided by the client.

## API EndPoints

BASE URL: https://midday-weather.herokuapp.com/

- /location

  | Purpose          | To get the weather conditions of a text based location search by the user |
  | ---------------- | ------------------------------------------------------------------------- |
  | METHOD           | GET                                                                       |
  | Query Parameters | address                                                                   |
  | Path Parameters  | None                                                                      |
  | Request Body     | None                                                                      |
  | URL              | https://midday-weather.herokuapp.com/location?address= Paris              |

  - /location

  | Purpose          | To get the weather conditions of the coordinates searched by the user   |
  | ---------------- | ----------------------------------------------------------------------- |
  | METHOD           | GET                                                                     |
  | Query Parameters | lat, long                                                               |
  | Path Parameters  | None                                                                    |
  | Request Body     | None                                                                    |
  | URL              | https://midday-weather.herokuapp.com/coordinates?lat=53.2734&long=-7.77 |
>>>>>>> 2d009b5 (README updated)

## License

MIT © Ninad Sutrave
