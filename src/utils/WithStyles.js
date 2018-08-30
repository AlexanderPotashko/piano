import React from 'react'
import className from 'classnames/bind'

const withStyles = (styles) => (WrappedComponent) => {
  return class WithStyles extends React.Component {
    constructor(props) {
      super(props)

      this.styles = className.bind(styles)
    }

    render() {
      return <WrappedComponent {...this.props} styles={this.styles} />
    }
  }
}

export default withStyles
