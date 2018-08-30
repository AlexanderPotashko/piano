import React from 'react'
import PropTypes from 'prop-types'
import Dimensions from 'react-dimensions'

class DimensionsProvider extends React.Component {
  static propTypes = {
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
    children: PropTypes.func
  }

  render() {
    return (
      <div>
        {this.props.children({
          containerWidth: this.props.containerWidth,
          containerHeight: this.props.containerHeight,
        })}
      </div>
    )
  }
}

export default Dimensions()(DimensionsProvider)
