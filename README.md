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
  
## Front End

Git repository: https://github.com/NinadSutrave/midday

Live Website: https://midday.netlify.app

## License

MIT © Ninad Sutrave
