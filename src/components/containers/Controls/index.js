import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import {connect} from 'react-redux'
import {IconContext} from 'react-icons';
import {FaSave} from 'react-icons/fa'

import Types from '../../Types'

import styles from './styles.scss'

const cx = classNames.bind(styles)

const noopEvent = (e) => e.stopPropagation()

@connect(
  (state) => ({melodies: state.melodies.list})
)
class Controls extends Component {
  static propTypes = {
    melody: Types.Melody,
    melodies: Types.Melodies,
    isPlay: PropTypes.bool,
    selectMelody: PropTypes.func,
    save: PropTypes.func
  }

  constructor (props) {
    super(props)

    this.input = React.createRef()
    this.select = React.createRef()
    this.inputEvents = {
      onKeyDown: this.onKeyDown,
      onKeyUp: noopEvent
    }
  }

  getPianoTitle = (melody) => {
    const duration = melody.record.end
    const seconds = parseInt((duration / 1000) % 60)
    const minutes = parseInt((duration / (1000 * 60)) % 60)
    const hours = parseInt((duration / (1000 * 60 * 60)) % 24)

    return `${melody.name} (${hours}h ${minutes}m ${seconds}s)`
  }

  onKeyDown = (e) => {
    noopEvent(e)

    if (e.keyCode === 13) {
      this.save()
    }
  }

  onClick = () => {
    this.save()
  }

  onChange = () => {
    const value = this.select.current.value

    this.props.selectMelody(value)
  }

  save = () => {
    const value = this.input.current.value.replace(/ /g, '-')

    if (value.length > 0) {
      this.props.save(value)
      this.input.current.value = ''
    }
  }

  render() {
    const {melody, melodies} = this.props

    return (<div className={cx('controls')}>
      <div className={cx('title')}>{melody && this.getPianoTitle(melody) || ''}</div>
      <div className={cx('buttons')}>
        <input ref={this.input} {...this.inputEvents} className={cx('input')} />
        <IconContext.Provider value={{className: cx('saveButton')}}>
          <FaSave onClick={this.onClick} />
        </IconContext.Provider>
        {!!melodies.length && (<select
          ref={this.select}
          onChange={this.onChange}
          onBlur={noopEvent}
          className={cx('select')}
          value={melody.id}
        >
          {melodies.map((item, key) => (
            <option key={key} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>)}
      </div>
    </div>)
  }
}

export default Controls 
