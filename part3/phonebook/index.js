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
    morgan.token('body-json', (req) => JSON.stringify(req.body))
    console.log(req.method)
    if (req.method === 'POST') {
        tiny = tiny.concat(tokens['body-json'](req, res))
    }
    return tiny.join(' ')
}))

app.use(cors())

app.get('/', (_req, res) => {
    console.log('Coucou')
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (_req, res) => {
    console.log('Info')
    Person.countDocuments({}, (_err, count) => {
        console.log(count)
        res.send(`
            <div>
                <div>Phonebook has info for ${count} people</div>
                <div>${new Date()}}</div>
            </div>`
        )
    })
})

app.get('/api/persons', (_req, res) => {
    console.log('Coucou persons')
    Person.find({}).then(notes => {
        res.json(notes)
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    console.log(`Get info for ${id}`)
    Person.findById(id)
        .then(person => {
            if (person) {
                res.json(person)
            }
            else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    console.log('Adding new person')
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedNote => res.json(savedNote))
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    console.log('Updating person number')
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, { runValidators: true, context: 'query', new: true })
        .then(updatedPerson => {
            if (updatedPerson) {
                res.json(updatedPerson)
            }
            else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})


const unknownEndpoint = (_request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, _request, response, next) => {
    console.log(error)
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
