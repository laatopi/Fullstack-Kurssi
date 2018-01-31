const mongoose = require('mongoose')

const url = 'mongodb://fullstack:sekred@ds121118.mlab.com:21118/fullstack'

mongoose.connect(url)
mongoose.Promise = global.Promise

const Note = mongoose.model('Note', {
    content: String,
    date: Date,
    important: Boolean
})

module.exports = Note