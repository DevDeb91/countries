import { useEffect, useState } from 'react'
import Card from './components/Card/Card'
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

  const handleSelectorChanges = async (names) => {
    const countries = allCountries.filter(({ name }) => names.includes(name.common))

    setSelectedCountries(countries)
  }

  const handleRemoveCard = (countryName) => {
    setSelectedCountries((prevCountries) =>
      prevCountries.filter((country) => country.name.common !== countryName),
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

      <div className="cards">
        {selectedCountries.map((country, index) => (
          <Card country={country} key={`country_${index}`} onRemove={handleRemoveCard} />
        ))}
      </div>
    </div>
  )
}

export default App
