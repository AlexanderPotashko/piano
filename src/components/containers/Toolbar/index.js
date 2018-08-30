import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {IconContext} from 'react-icons';
import {TiMediaRecord, TiMediaPlay, TiMediaStop} from 'react-icons/ti'
import WithStyles from '../../../utils/WithStyles'

import Types from '../../Types'

import styles from './styles.scss'

const noop = () => {}

@WithStyles(styles)
class Toolbar extends Component {
  static propTypes = {
    styles: PropTypes.func,
    melody: Types.Melody,
    isPlay: PropTypes.bool,
    onPlayStart: PropTypes.func,
    onPlayStop: PropTypes.func,
    onRecordStart: PropTypes.func,
    onRecordStop: PropTypes.func
  }

  static defaultProps = {
    onPlayStart: noop,
    onPlayStop: noop,
    onRecordStart: noop,
    onRecordStop: noop 
  }

  constructor (props) {
    super(props)

    this.state = {isRecord: false}

    this.toggleRecord = this.toggleRecord.bind(this)
    this.togglePlay = this.togglePlay.bind(this)
  }

  toggleRecord () {
    const {isRecord} = this.state
    const {isPlay} = this.props

    if (isPlay) {
      return false
    }

    if (isRecord) {
      this.props.onRecordStop()
    } else {
      this.props.onRecordStart()
    }

    this.setState({isRecord: !isRecord})
  }

  togglePlay () {
    const {isRecord} = this.state
    const {isPlay} = this.props

    if (isRecord) {
      return false
    }

    if (isPlay) {
      this.props.onPlayStop()
    } else {
      this.props.onPlayStart()
    }
  }

  render() {
    const {styles} = this.props

    return (
      <div className={styles('container')}>
          <IconContext.Provider value={{className: styles('active')}}>
            {
              this.state.isRecord
                ? (<TiMediaStop onClick={this.toggleRecord} />)
                : (<TiMediaRecord onClick={this.toggleRecord} />)
            }
          </IconContext.Provider>
          { this.props.melody
            ? this.props.isPlay
              ? (<TiMediaStop onClick={this.togglePlay} />)
              : (<TiMediaPlay onClick={this.togglePlay} />)
            : null
          }
      </div>
    )
  }
}

export default Toolbar 
