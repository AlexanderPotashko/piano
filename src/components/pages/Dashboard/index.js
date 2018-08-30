import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import WithStyles from '../../../utils/WithStyles'
import {logout, getSongs} from '../../../store/actions'

import Spinner from '../../presentational/Spinner'
import Header from '../../presentational/Header'

import SoundfontProvider from './SoundfontProvider'
import DimensionsProvider from './DimensionsProvider'

import Toolbar from '../../containers/Toolbar'
import Controls from '../../containers/Controls'
import {Piano, KeyboardShortcuts, MidiNumbers} from '../../containers/Piano'

import * as metadata from '../../../metadata'

import styles from './styles.scss'

const getAudioContext = (w) => (new (w.AudioContext || w.webkitAudioContext)())
const soundfontHostname = 'https://d1pzp51pvbm36p.cloudfront.net'

@connect(
  () => ({}),
  dispatch => ({
    logout: bindActionCreators(logout, dispatch),
    getSongs: bindActionCreators(getSongs.request, dispatch)
  })
)
@WithStyles(styles)
class Dashboard extends Component {
  static propTypes = {
    logout: PropTypes.func,
    getSongs: PropTypes.func,
    styles: PropTypes.func
  }

  componentDidMount () {
    this.props.getSongs()
  }

  render() {
    const {styles} = this.props
    const firstNote = MidiNumbers.fromNote('c3')
    const lastNote = MidiNumbers.fromNote('f5')

    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: firstNote,
      lastNote: lastNote,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    })

    return (
      <div>
        <Helmet
          title={`${metadata.title} - Dashboard`}
          meta={metadata.meta}
          link={metadata.link}
          script={metadata.script}
          noscript={metadata.noscript}
        />
        <section className={styles('section')}>
          <Header logout={this.props.logout} />
          <section className={styles('content')}>
            <div className={styles('container')}>
              <DimensionsProvider>
                {({containerWidth}) => (
                  <SoundfontProvider
                    instrumentName='acoustic_grand_piano'
                    audioContext={process.browser && getAudioContext(window)}
                    hostname={soundfontHostname}
                    render={
                      ({
                        melody,
                        isLoading,
                        isPlay,
                        playbackNotes,
                        playNote,
                        stopNote,
                        record,
                        stopRecord,
                        play,
                        stopPlay,
                        selectMelody,
                        save
                      }) => (
                        <div>
                          <Controls
                            isPlay={isPlay}
                            melody={melody}
                            selectMelody={selectMelody}
                            save={save}
                          />
                          <Toolbar
                            melody={melody}
                            isPlay={isPlay}
                            onRecordStart={record}
                            onRecordStop={stopRecord}
                            onPlayStart={play}
                            onPlayStop={stopPlay}
                          />
                          {(isLoading)
                            ? (<Spinner className={styles('spinner')} />)
                            : (<Piano
                              playbackNotes={playbackNotes}
                              noteRange={{first: firstNote, last: lastNote}}
                              onPlayNote={playNote}
                              onStopNote={stopNote}
                              width={containerWidth}
                              disabled={isLoading}
                              keyboardShortcuts={keyboardShortcuts}
                            />)}
                        </div>
                      )
                    }
                  />
                )}
              </DimensionsProvider>
            </div>
          </section>
        </section>
      </div>
    )
  }
}

export default Dashboard
