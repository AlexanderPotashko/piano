const {ApolloServer, gql} = require('apollo-server')
const uuid = require('uuid/v4')

const GeneralsMelody = {
  "id":"eca2bdc9-16f7-4d0a-91f4-36a39c6583bd",
  "name":"Generals",
  "record":{
    "start":0,
    "end":34982,
    "notes":[
      {"midiNumber":48, "start":339, "end":657},
      {"midiNumber":51, "start":618, "end":954},
      {"midiNumber":53, "start":931, "end":1234},
      {"midiNumber":55, "start":1163, "end":1532},
      {"midiNumber":53, "start":1482, "end":1811},
      {"midiNumber":51, "start":1771, "end":1922},
      {"midiNumber":50, "start":2026, "end":2434},
      {"midiNumber":48, "start":2387, "end":3002},
      {"midiNumber":55, "start":2938, "end":3570},
      {"midiNumber":53, "start":3538, "end":4778},
      {"midiNumber":50, "start":4852, "end":5210},
      {"midiNumber":55, "start":5187, "end":5442},
      {"midiNumber":53, "start":5395, "end":5778},
      {"midiNumber":51, "start":5724, "end":6642},
      {"midiNumber":50, "start":6843, "end":7106},
      {"midiNumber":53, "start":7146, "end":7395},
      {"midiNumber":51, "start":7404, "end":7577},
      {"midiNumber":50, "start":7707, "end":9017},
      {"midiNumber":48, "start":9004, "end":9338},
      {"midiNumber":51, "start":9315, "end":9675},
      {"midiNumber":53, "start":9586, "end":9946},
      {"midiNumber":55, "start":9891, "end":10250},
      {"midiNumber":53, "start":10211, "end":10563},
      {"midiNumber":51, "start":10497, "end":10762},
      {"midiNumber":50, "start":10834, "end":11234},
      {"midiNumber":48, "start":11211, "end":11786},
      {"midiNumber":60, "start":11792, "end":12466},
      {"midiNumber":58, "start":12426, "end":13713},
      {"midiNumber":55, "start":14034, "end":14289},
      {"midiNumber":60, "start":14330, "end":14641},
      {"midiNumber":58, "start":14611, "end":14970},
      {"midiNumber":56, "start":14947, "end":16050},
      {"midiNumber":55, "start":16146, "end":16489},
      {"midiNumber":58, "start":16466, "end":16810},
      {"midiNumber":56, "start":16754, "end":17050},
      {"midiNumber":55, "start":17097, "end":18506},
      {"midiNumber":48, "start":18547, "end":18857},
      {"midiNumber":51, "start":18817, "end":19194},
      {"midiNumber":53, "start":19122, "end":19513},
      {"midiNumber":55, "start":19458, "end":19802},
      {"midiNumber":53, "start":19754, "end":20178},
      {"midiNumber":51, "start":20089, "end":20313},
      {"midiNumber":50, "start":20394, "end":20761},
      {"midiNumber":48, "start":20730, "end":21394},
      {"midiNumber":55, "start":21401, "end":22090},
      {"midiNumber":53, "start":22066, "end":23393},
      {"midiNumber":50, "start":23435, "end":23825},
      {"midiNumber":55, "start":23770, "end":24097},
      {"midiNumber":53, "start":24017, "end":24465},
      {"midiNumber":51, "start":24346, "end":24585},
      {"midiNumber":50, "start":24658, "end":25001},
      {"midiNumber":53, "start":24969, "end":25401},
      {"midiNumber":51, "start":25289, "end":25641},
      {"midiNumber":50, "start":25690, "end":26458},
      {"midiNumber":51, "start":26385, "end":27138},
      {"midiNumber":48,  "start":27105,  "end":28849}
    ]
  }
}

const songs = [
  GeneralsMelody
]

const typeDefs = gql`
  type Note {
    midiNumber: Float,
    start: Float,
    end: Float 
  }

  type Record {
    start: Float,
    end: Float,
    notes: [Note]
  }

  type Song {
    id: ID!
    name: String
    record: Record
  }

  type Query {
    songs: [Song]
  }

  input InputNote {
    midiNumber: Float,
    start: Float,
    end: Float 
  }

  input InputRecord {
    start: Float,
    end: Float,
    notes: [InputNote]
  }

 type Mutation {
   addSong(name: String, record: InputRecord): Song
 }
`

const resolvers = {
  Query: {
    songs: () => songs,
  },
  Mutation: {
    addSong: (_, {name, record}) => {
      const newSong = { 
        id: uuid(),
        name,
        record
      }

      songs.push(newSong)

      return newSong
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Apollo server running: ${url}`);
});
