import COLORS from '../../utils/colors'

const styles = {
  container: (base) => ({
    ...base,
    fontSize: '15px',
    margin: '20px',
    textAlign: 'left',
  }),

  control: (base) => ({
    ...base,
    boxShadow: 'none',
    border: `2px solid ${COLORS.violet}`,
    ':hover': { border: `2px solid ${COLORS.violet}`, cursor: 'pointer' },
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: COLORS.violet,
    opacity: '.8',
    ':hover': { opacity: '1' },
  }),

  multiValue: (base) => ({
    ...base,
    backgroundColor: COLORS.lightBlue,
  }),

  noOptionsMessage: (base) => ({
    ...base,
    color: COLORS.neutralLight,
  }),

  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? COLORS.lightBlue : null,
    cursor: 'pointer',
    ':active': { backgroundColor: COLORS.lightBlue },
  }),

  placeholder: (base) => ({
    ...base,
    color: COLORS.neutralLight,
  }),
}

export default styles
