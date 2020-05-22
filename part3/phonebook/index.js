require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.json())
app.use(express.static('build'))
app.use(morgan((tokens, req, res) => {
    let tiny = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
      ]
    morgan.token("body-json", (req, res) => JSON.stringify(req.body))
    console.log(req.method)
    if (req.method === "POST") {
        tiny = tiny.concat(tokens["body-json"](req, res))
    }
    return tiny.join(' ')
  })
)
app.use(cors())

app.get('/', (req, res) => {
    console.log("Coucou")
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    console.log("Info")

    res.send(`
        <div>
            <div>Phonebook has info for ${persons.length} people</div>
            <div>${new Date()}}</div>
        </div>`
        )
})

app.get('/api/persons', (req, res) => {
    console.log("Coucou persons")
    Person.find({}).then(notes => {
        res.json(notes)
    })
})

app.get('/api/persons/:id', (req, res) => {
    console.log(`Get info for ${id}`)
    Person.findById(request.params.id).then(note => {
        res.json(note)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(`Delete ${id}`)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    console.log("Adding new person")
    const body = req.body
    const name = body.name
    if (!name) {
        return res.status(400).json({ 
            error: 'name missing' 
        })
    }

    /*if (persons.find(person => person.name === name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }*/

    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedNote => {
        res.json(savedNote)
    })
})

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
