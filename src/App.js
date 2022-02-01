import { useEffect, useState } from 'react'
import Card from './components/Card/Card'
import Map from './components/Map/Map'
import Selector from './components/Selector/Selector'
import Api from './utils/Api'
import './App.css'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [areCountriesLoaded, setAreCountriesLoaded] = useState(false)
  const [selectedCountries, setSelectedCountries] = useState([])

  useEffect(() => {
    async function fetchData() {
      setAllCountries(await Api.getAllCountries())
      setAreCountriesLoaded(true)
    }

    fetchData()
  }, [])

  const convertCountryNameToOption = (countryName) => ({ label: countryName, value: countryName })

  const addCountryByCode = (countryCode) => {
    const country = allCountries.find((country) => country.cca3 === countryCode)

    if (country) {
      setSelectedCountries((prevCountries) => [...prevCountries, country])
    }
  }

  const handleSelectorChanges = (names) => {
    const countries = names.map((name) =>
      allCountries.find((country) => name === country.name.common),
    )

    setSelectedCountries(countries)
  }
  const removeCountryByName = (countryName) => {
    setSelectedCountries((prevCountries) =>
      prevCountries.filter((country) => country.name.common !== countryName),
    )
  }

  const removeCountryByCode = (countryCode) => {
    setSelectedCountries((prevCountries) =>
      prevCountries.filter((country) => country.cca3 !== countryCode),
    )
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Countries</h1>

        <div className="selector">
          <Selector
            isLoading={!areCountriesLoaded}
            options={allCountries.map(({ name }) => convertCountryNameToOption(name.common))}
            onValueChange={(names) => handleSelectorChanges(names)}
            value={selectedCountries.map(({ name }) => convertCountryNameToOption(name.common))}
          />
        </div>
      </header>

      <div className="countries">
        <div className="countries__map desktop-only">
          <Map
            onCountrySelection={addCountryByCode}
            onCountryDeselection={removeCountryByCode}
            selectedCountries={selectedCountries.map(({ cca3 }) => cca3)}
          />
        </div>

        <div className="countries__cards">
          {selectedCountries.map((country, index) => (
            <Card country={country} key={`country_${index}`} onRemove={removeCountryByName} />
          ))}

          {selectedCountries.length === 0 && <p>Select one or more countries to get information</p>}

          <div className="fade-top desktop-only"></div>

          <div className="fade-bottom desktop-only"></div>
        </div>
      </div>
    </div>
  )
}

export default App
