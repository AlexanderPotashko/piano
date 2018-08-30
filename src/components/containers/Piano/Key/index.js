import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import MidiNumbers from '../MidiNumbers'

import styles from './styles.scss'

const cx = classNames.bind(styles)

const ratioToPercentage = (ratio) => (`${ratio * 100}%`)

class Key extends React.Component {
  static propTypes = {
    midiNumber: PropTypes.number.isRequired,
    naturalKeyWidth: PropTypes.number.isRequired, // Width as a ratio between 0 and 1
    gliss: PropTypes.bool.isRequired,
    useTouchEvents: PropTypes.bool.isRequired,
    accidental: PropTypes.bool.isRequired,
    active: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    onPlayNote: PropTypes.func.isRequired,
    onStopNote: PropTypes.func.isRequired,
    accidentalWidthRatio: PropTypes.number.isRequired,
    pitchPositions: PropTypes.object.isRequired,
    noteRange: PropTypes.object,
    children: PropTypes.node
  }

  static defaultProps = {
    accidentalWidthRatio: 0.65,
    pitchPositions: {
      C: 0,
      Db: 0.55,
      D: 1,
      Eb: 1.8,
      E: 2,
      F: 3,
      Gb: 3.5,
      G: 4,
      Ab: 4.7,
      A: 5,
      Bb: 5.85,
      B: 6,
    }
  }

  playNote = () => {
    this.props.onPlayNote(this.props.midiNumber)
  }

  stopNote = () => {
    this.props.onStopNote(this.props.midiNumber)
  }

  getAbsoluteKeyPosition(midiNumber) {
    const OCTAVE_WIDTH = 7
    const {octave, pitchName} = MidiNumbers.getAttributes(midiNumber)
    const pitchPosition = this.props.pitchPositions[pitchName]
    const octavePosition = OCTAVE_WIDTH * octave

    return pitchPosition + octavePosition
  }

  getRelativeKeyPosition(midiNumber) {
    return (
      this.getAbsoluteKeyPosition(midiNumber) -
      this.getAbsoluteKeyPosition(this.props.noteRange.first)
    )
  }

  render() {
    const {
      naturalKeyWidth,
      accidentalWidthRatio,
      midiNumber,
      gliss,
      useTouchEvents,
      accidental,
      active,
      disabled,
      children
    } = this.props

    return (
      <div
        className={cx('key', {
          'accidental': accidental,
          'natural': !accidental,
          'disabled': disabled,
          'active': active
        })}
        style={{
          left: ratioToPercentage(this.getRelativeKeyPosition(midiNumber) * naturalKeyWidth),
          width: ratioToPercentage(
            accidental ? accidentalWidthRatio * naturalKeyWidth : naturalKeyWidth,
          ),
        }}
        onMouseDown={useTouchEvents ? null : this.playNote}
        onMouseUp={useTouchEvents ? null : this.stopNote}
        onMouseEnter={gliss ? this.playNote : null}
        onMouseLeave={this.stopNote}
        onTouchStart={useTouchEvents ? this.playNote : null}
        onTouchCancel={useTouchEvents ? this.stopNote : null}
        onTouchEnd={useTouchEvents ? this.stopNote : null}
      >
        <div className={cx('lobelContainer')}>{children}</div>
      </div>
    )
  }
}

export default Key
