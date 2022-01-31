import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './Card.css'

function Card({ country, onRemove }) {
  const countryName = country.name.common

  const countryInfo = [
    { label: 'Continent', value: country.continents.join(', ') },
    { label: 'Capital', value: country.capital[0] },
    { label: 'Region', value: country.region },
    { label: 'Area', value: `${country.area} km²` },
    { label: 'Population', value: `${country.area} km²` },
    { label: 'Languages', value: Object.values(country.languages).join(', ') },
    {
      label: 'Currency',
      value: Object.values(country.currencies)
        .map(({ name, symbol }) => `${name} (${symbol})`)
        .join(', '),
    },
  ]

  return (
    <div className="card">
      <button
        className="card__remove"
        onClick={() => {
          onRemove(countryName)
        }}
        role="button"
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>

      <h2>
        {countryName}{' '}
        <span className="card__flag mobile-only" aria-label={`flag for ${countryName}`} role="img">
          {country.flag}
        </span>
      </h2>

      <div className="card__info">
        <div>
          {countryInfo.map(({ label, value }) => (
            <div key={label}>
              <b>{label}:</b> <span>{value}</span>
            </div>
          ))}
        </div>

        <div className="card__info__flag mobile-hidden">
          <img src={country.flags.svg} />
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  country: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default Card
