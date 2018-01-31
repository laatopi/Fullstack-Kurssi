const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Note = require('./models/note')

const formatNote = (note) => {
    return {
        content: note.content,
        date: note.date,
        important: note.important,
        id: note._id
    }
}

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

const logger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(logger)

let notes = [
    {
        id: 1,
        content: 'HTML on helppoa',
        date: '2017-12-10t17:30:31.098Z',
        important: true
    },
    {
        id: 2,
        content: 'Selain pystyy suorittamaan vain javascriptiä',
        date: '2017-12-10T18:39:34.091Z',
        important: false
    },
    {
        id: 3,
        content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
        date: '2017-12-10T19:20:14.298Z',
        important: false
    }
]

app.get('/api/notes', (request, response) => {
    Note
    .find({}, {__v: 0})
    .then(notes => {
      response.json(notes.map(formatNote))
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note
    .findById(request.params.id)
    .then(note => {
      response.json(formatNote(note))
    })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = notes.length > 0 ? notes.map(n => n.id).sort().reverse()[0] : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
  
    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date()
    })
  
    note
      .save()
      .then(savedNote => {
        response.json(formatNote(savedNote))
      })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})