// See https://github.com/danigb/soundfont-player
// for more documentation on prop options.
import React from 'react'
import PropTypes from 'prop-types'
import Soundfont from 'soundfont-player'
import uuid from 'uuid/v4'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {saveMelody} from '../../../store/actions'
import {getMelodyById} from '../../../store/selectors'

import Types from '../../Types'

@connect(
  (state) => ({melodies: state.melodies.list}),
  (dispatch) => ({saveMelody: bindActionCreators(saveMelody, dispatch)})
)
class SoundfontProvider extends React.Component {
  static propTypes = {
    saveMelody: PropTypes.func,
    melodies: Types.Melodies,
    instrumentName: PropTypes.string.isRequired,
    hostname: PropTypes.string.isRequired,
    format: PropTypes.oneOf(['mp3', 'ogg']),
    soundfont: PropTypes.oneOf(['MusyngKite', 'FluidR3_GM']),
    audioContext: PropTypes.object,
    render: PropTypes.func
  }

  static defaultProps = {
    format: 'mp3',
    soundfont: 'MusyngKite',
    instrumentName: 'acoustic_grand_piano'
  }

  constructor(props) {
    super(props)

    this.defaultRecord = {start: null, end: null, notes: []}
    this.state = {
      melodyId: -1,
      timeouts: [],
      isPlay: false,
      isRecord: false,
      record: {...this.defaultRecord},
      activeAudioNodes: {},
      instrument: null
    }
  }

  componentDidMount() {
    this.loadInstrument(this.props.instrumentName)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.instrumentName !== this.props.instrumentName) {
      this.loadInstrument(this.props.instrumentName)
    }
  }

  get playbackNotes () {
    const notes = this.state.activeAudioNodes
    
    return Object.keys(notes).reduce((playback, midiNumber) => {
      if (notes[midiNumber] !== null) {
        playback = playback.concat(parseInt(midiNumber, 10))
      }

      return playback
    }, [])
  }

  loadInstrument = (instrumentName) => {
    this.setState({instrument: null})

    Soundfont.instrument(
      this.props.audioContext,
      instrumentName,
      {
        format: this.props.format,
        soundfont: this.props.soundfont,
        nameToUrl: (name, soundfont, format) => 
          (`${this.props.hostname}/${soundfont}/${name}-${format}.js`)
      }
    ).then(instrument => {
      this.setState({instrument})
    })
  }

  playNote = (midiNumber) => {
    this.props.audioContext.resume().then(() => {
      const audioNode = this.state.instrument.play(midiNumber)

      this.setState({
        activeAudioNodes: Object.assign(
          {},
          this.state.activeAudioNodes,
          {[midiNumber]: {
            audioNode,
            data: {midiNumber, start: new Date().valueOf()}
          }}
        ),
      })
    })
  }

  stopNote = (midiNumber) => {
    this.props.audioContext.resume().then(() => {

      if (!this.state.activeAudioNodes[midiNumber]) {
        return
      }

      const item = this.state.activeAudioNodes[midiNumber]
      const melodyNode = {...item.data, end: new Date().valueOf()}

      item.audioNode.stop()

      this.setState({
        activeAudioNodes: Object.assign(
          {},
          this.state.activeAudioNodes,
          {[midiNumber]: null}
        ),
        record: {
          ...this.state.record,
          notes: this.state.record.notes.concat(melodyNode)
        }
      })
    })
  }

  stopAllNotes = () => {
    this.props.audioContext.resume().then(() => {
      const activeAudioNodes = Object.values(this.state.activeAudioNodes);

      activeAudioNodes.forEach(node => node && node.audioNode.stop())

      this.setState({activeAudioNodes: {}})
    })
  }

  record = () => {
    const record = {...this.defaultRecord, start: new Date().valueOf()}

    this.setState({record, isRecord: true})
  }

  stopRecord = () => {
    this.setState({isRecord: false})
  }

  play = () => {
    const melody = getMelodyById(this.state.melodyId, this.props.melodies)

    if (!melody) {
      return false
    }

    const {record} = melody

    this.setState({isPlay: true}, () => {
      const timeouts = []

      record.notes.map(({midiNumber, start, end}) => {
        timeouts.push(setTimeout(() => this.playNote(midiNumber), start))
        timeouts.push(setTimeout(() => this.stopNote(midiNumber), end))
      })
      timeouts.push(setTimeout(() => this.setState({isPlay: false}), record.end))

      this.setState({timeouts})
    })
  }

  stopPlay = () => {
    const {timeouts} = this.state

    this.stopAllNotes()

    timeouts.map((id) => clearTimeout(id))

    this.setState({isPlay: false})
  }

  save = (name) => {
    const record = this.parseRecord({...this.state.record, end: new Date().valueOf()})

    if (this.state.isRecord || record.notes.length === 0) {
      return false
    }

    const melody = {id: uuid(), record, name}

    this.props.saveMelody(melody)

    this.setState({melodyId: melody.id})
  }

  selectMelody = (melodyId) => {
    this.stopPlay()
    this.setState({melodyId})
  }

  parseRecord = (record) => {
    const start = 0
    const end = (record.end - record.start)
    const notes = record.notes.map((note) => ({
      ...note,
      start: (note.start - record.start),
      end: (note.end - record.start)
    }))

    return {start, end, notes}
  }

  render() {
    return this.props.render({
      melody: getMelodyById(this.state.melodyId, this.props.melodies),
      isLoading: !this.state.instrument,
      isPlay: this.state.isPlay,
      playbackNotes: this.state.isPlay ? this.playbackNotes : undefined,
      playNote: this.playNote,
      stopNote: this.stopNote,
      stopAllNotes: this.stopAllNotes,
      record: this.record,
      stopRecord: this.stopRecord,
      play: this.play,
      stopPlay: this.stopPlay,
      selectMelody: this.selectMelody,
      save: this.save
    })
  }
}

export default SoundfontProvider
