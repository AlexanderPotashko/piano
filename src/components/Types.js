import PropTypes from 'prop-types'

const Note = PropTypes.shape({
  start: PropTypes.number,
  end: PropTypes.number,
  midiNumber: PropTypes.number
})

const Record = PropTypes.shape({
  start: PropTypes.number,
  end: PropTypes.number,
  notes: PropTypes.arrayOf(Note)
})

const Melody = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  record: Record
}) 

const Types = {
  Note,
  Melody: PropTypes.oneOfType([
    PropTypes.bool,
    Melody
  ]),
  Record,
  Melodies: PropTypes.arrayOf(Melody)
}

export default Types
