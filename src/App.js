import { useState } from 'react'
import './App.css'
import Api from './utils/Api'

function App() {
  const [selectedCountries, setSelectedCountries] = useState([])

  const addCountryByName = async (name) => {
    const country = await Api.getCountryByName(name)

    setSelectedCountries((prevState) => [...prevState, ...country])
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Countries</h1>
      </header>

      <div>
        <button
          onClick={() => {
            addCountryByName('peru')
          }}
        >
          Add Peru
        </button>

        <button
          onClick={() => {
            addCountryByName('Norfolk Island')
          }}
        >
          Add Norfolk Island
        </button>

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
