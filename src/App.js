import { useEffect, useState } from 'react'
import Card from './components/Card/Card'
import Map from './components/Map/Map'
import Selector from './components/Selector/Selector'
import Api from './utils/Api'
import './App.css'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])

  useEffect(async () => {
    setAllCountries(await Api.getAllCountries())
  }, [])

  const convertCountryNameToOption = (countryName) => ({ label: countryName, value: countryName })

  const addCountryByCode = (countryCode) => {
    const country = allCountries.find((country) => country.cca3 === countryCode)

    setSelectedCountries((prevCountries) => [...prevCountries, country])
  }

  const handleSelectorChanges = (names) => {
    const countries = allCountries.filter(({ name }) => names.includes(name.common))
    setSelectedCountries(countries)
  }
  const handleRemoveCard = (countryName) => {
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
            value={selectedCountries.map(({ name }) => convertCountryNameToOption(name.common))}
            options={allCountries.map(({ name }) => convertCountryNameToOption(name.common))}
            onValueChange={(names) => handleSelectorChanges(names)}
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
            <Card country={country} key={`country_${index}`} onRemove={handleRemoveCard} />
          ))}

          <div className="fade-top desktop-only"></div>

          <div className="fade-bottom desktop-only"></div>
        </div>
      </div>
    </div>
  )
}

export default App
