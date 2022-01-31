import { memo, useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { ZoomableGroup, ComposableMap, Geographies, Geography } from 'react-simple-maps'
import COLORS from '../../utils/colors'

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json'

const Map = ({ selectedCountries, onCountryDeselection, onCountrySelection }) => {
  const [tooltipContent, setTooltipContent] = useState('')

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const { ISO_A3, NAME } = geo.properties
                const isSelected = selectedCountries.includes(ISO_A3)

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (isSelected) {
                        onCountryDeselection(ISO_A3)
                      } else {
                        onCountrySelection(ISO_A3)
                      }
                    }}
                    onMouseEnter={() => {
                      setTooltipContent(NAME)
                    }}
                    onMouseLeave={() => {
                      setTooltipContent('')
                    }}
                    style={{
                      default: {
                        fill: isSelected ? COLORS.violet : COLORS.neutralLight,
                        outline: 'none',
                      },
                      hover: {
                        cursor: 'pointer',
                        fill: isSelected ? COLORS.violet : COLORS.neutral,
                        outline: 'none',
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
    </>
  )
}

export default memo(Map)
