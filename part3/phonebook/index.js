const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
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

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number":"00-12-3456",
        "id": 4
    }
]

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
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(`Get info for ${id}`)
    const person = persons.find(person => person.id === id)
    person ? res.json(person) : res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(`Delete ${id}`)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const id = Math.round(Math.random() * 1000000);
    const body = req.body
    console.log("Adding new person")
    const name = body.name
    if (!name) {
        return res.status(400).json({ 
            error: 'name missing' 
        })
    }

    if (persons.find(person => person.name === name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id
    }

    persons = persons.concat(person)  
    res.json(person)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)