import PropTypes from 'prop-types'
import Select from 'react-select'
import styles from './styles'

function Selector({ onValueChange, options, selections, value }) {
  const handleChange = (newSelections) => {
    const newValues = newSelections.map(({ value }) => value)

    onValueChange(newValues)
  }

  return (
    <Select
      defaultValue={selections}
      isMulti
      onChange={(newSelections) => handleChange(newSelections)}
      options={options}
      styles={styles}
      value={value}
    />
  )
}

Selector.propTypes = {
  onValueChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.exact({ label: PropTypes.string, value: PropTypes.any })),
  selections: PropTypes.array,
  value: PropTypes.arrayOf(PropTypes.exact({ label: PropTypes.string, value: PropTypes.any })),
}

Selector.defaultProps = {
  onValueChange: null,
  options: [],
  selections: [],
  value: [],
}

export default Selector
