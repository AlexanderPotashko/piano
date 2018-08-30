import express from 'express'
import {request} from 'graphql-request'

const apiRouter = express.Router()

apiRouter.use('/api/auth', (req, res) => {
  //const { email, password } = req.body

  res.send({
    token: Math.random()
      .toString(36)
      .substr(2)
  })
})

apiRouter.get('/api/songs', (req, res) => {
  const query = `query {
    songs {
      id
      name
      record {
        start
        end
        notes {
          start
          end
          midiNumber
        }
      }
    }
  }`

  request('http://localhost:4000', query).then(data => res.send(data))
})

const note = ({midiNumber, start, end}) => (`{midiNumber: ${midiNumber} start: ${start} end: ${end}}`)
const getNotes = (notes) => notes.slice(1).reduce((string, item) => (`${string}, ${note(item)}`), note(notes[0]))

apiRouter.post('/api/songs', (req, res) => {
  const {name, record} = req.body
  const query = `mutation {
    addSong(
      name: "${name}"
      record: {
        start: ${record.start}
        end: ${record.end}
        notes: [${getNotes(record.notes)}]
      }
    ) {id}
  }`

  request('http://localhost:4000', query).then(data => res.send(data))
})

export default apiRouter;
