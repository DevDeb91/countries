import { useEffect, useState } from 'react'
import Selector from './components/Selector/Selector'
import Api from './utils/Api'
import './App.css'

function App() {
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])

  useEffect(async () => {
    setAllCountries(await Api.getAllCountries())
  }, [])

  const handleSelectorChanges = async (names) => {
    const countries = allCountries.filter(({ name }) => names.includes(name.common))

    setSelectedCountries(countries)
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Countries</h1>

        <div className="selector">
          <Selector
            options={allCountries.map(({ name }) => ({ label: name.common, value: name.common }))}
            onValueChange={(names) => handleSelectorChanges(names)}
          />
        </div>
      </header>

      <div>
        {selectedCountries.map((country, index) => (
          <div key={`country_${index}`}>
            {Object.keys(country).map((key) => `${key}: ${country[key]}; `)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
