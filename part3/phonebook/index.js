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

app.get('/api/persons/:id', (req, res, next) => {
    console.log(`Get info for ${id}`)
    Person.findById(request.params.id)
        .then(note => {
            if (note) {
                res.json(note)
            }
            else {
                res.status(404).end()
            }
        
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    console.log("Adding new person")
    const body = req.body
    const name = body.name

    if (!body.number) {
        next({
            name: "MissingNumberError",
            message: "number missing"
        })
        return
    }

    if (!name) {
        next({
            name: "MissingNameError",
            message: "name missing"
        })
        return
    }

    /*if (persons.find(person => person.name === name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }*/

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedNote => {
        res.json(savedNote)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    console.log("Updating person number")
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.log(error)
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }

    else if (error.name === "MissingNameError") {
        return response.status(400).send({ error: 'missing name' })
    }

    else if (error.name === "MissingNumberError") {
        return response.status(400).send({ error: 'missing number' })
    }
  
    next(error)
}
  
app.use(errorHandler)

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
