import React from 'react'
import PropTypes from 'prop-types'
import range from 'lodash/range'
import classNames from 'classnames/bind'

import Key from '../Key'
import MidiNumbers from '../MidiNumbers'

import styles from './styles.scss'

const cx = classNames.bind(styles)

class Keyboard extends React.Component {
  static propTypes = {
    noteRange: PropTypes.object,
    activeNotes: PropTypes.arrayOf(PropTypes.number),
    onPlayNote: PropTypes.func.isRequired,
    onStopNote: PropTypes.func.isRequired,
    renderNoteLabel: PropTypes.func.isRequired,
    keyWidthToHeight: PropTypes.number.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    gliss: PropTypes.bool,
    useTouchEvents: PropTypes.bool,
    width: PropTypes.number
  }

  static defaultProps = {
    disabled: false,
    gliss: false,
    useTouchEvents: false,
    keyWidthToHeight: 0.25,
    renderNoteLabel: () => {}
  }

  getMidiNumbers() {
    return range(this.props.noteRange.first, this.props.noteRange.last + 1)
  }

  getNaturalKeyCount() {
    return this.getMidiNumbers().filter((number) => {
      const {isAccidental} = MidiNumbers.getAttributes(number)

      return !isAccidental
    }).length
  }

  // Returns a ratio between 0 and 1
  getNaturalKeyWidth() {
    return 1 / this.getNaturalKeyCount()
  }

  getWidth() {
    return this.props.width ? this.props.width : '100%'
  }

  getHeight() {
    if (!this.props.width) {
      return '100%'
    }

    const keyWidth = this.props.width * this.getNaturalKeyWidth();

    return `${keyWidth / this.props.keyWidthToHeight}px`
  }

  render() {
    const naturalKeyWidth = this.getNaturalKeyWidth()

    return (
      <div
        className={cx('keyboard', this.props.className)}
        style={{ width: this.getWidth(), height: this.getHeight() }}
      >
        {this.getMidiNumbers().map((midiNumber) => {
          const {isAccidental} = MidiNumbers.getAttributes(midiNumber)
          const isActive = this.props.activeNotes.includes(midiNumber)

          return (
            <Key
              naturalKeyWidth={naturalKeyWidth}
              midiNumber={midiNumber}
              noteRange={this.props.noteRange}
              active={isActive}
              accidental={isAccidental}
              disabled={this.props.disabled}
              onPlayNote={this.props.onPlayNote}
              onStopNote={this.props.onStopNote}
              gliss={this.props.gliss}
              useTouchEvents={this.props.useTouchEvents}
              key={midiNumber}
            >
              {this.props.disabled
                ? null
                : this.props.renderNoteLabel({
                    isActive,
                    isAccidental,
                    midiNumber
                  })}
            </Key>
          )
        })}
      </div>
    )
  }
}

export default Keyboard
