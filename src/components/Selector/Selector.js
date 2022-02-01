import PropTypes from 'prop-types'
import Select, { components } from 'react-select'
import styles from './styles'
import Spinner from '../Spinner'

const NoOptionsMessage = (props) => {
  return (
    <components.NoOptionsMessage {...props}>
      <Spinner />
    </components.NoOptionsMessage>
  )
}

function Selector({ isLoading, onValueChange, options, value }) {
  const handleChange = (newSelections) => {
    const newValues = newSelections.map(({ value }) => value)

    onValueChange(newValues)
  }

  return (
    <Select
      components={{ NoOptionsMessage: isLoading ? NoOptionsMessage : components.NoOptionsMessage }}
      defaultValue={[]}
      isMulti
      onChange={(newSelections) => handleChange(newSelections)}
      options={options}
      styles={styles}
      value={value}
    />
  )
}

Selector.propTypes = {
  isLoading: PropTypes.bool,
  onValueChange: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.exact({ label: PropTypes.string, value: PropTypes.any })),
  value: PropTypes.arrayOf(PropTypes.exact({ label: PropTypes.string, value: PropTypes.any })),
}

Selector.defaultProps = {
  isLoading: false,
  onValueChange: null,
  options: [],
  value: [],
}

export default Selector
