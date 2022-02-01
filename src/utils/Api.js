import axios from 'axios'

const restCountries = axios.create({ baseURL: 'https://restcountries.com/v3.1' })

export default class Api {
  static getAllCountries = () =>
    restCountries
      .get('/all')
      .then((response) => response.data)
      .catch((error) => error)
}
