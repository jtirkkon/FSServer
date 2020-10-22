
//3.1, 3.2, 3.3, 3.4 ja 3.5 3.6 OK!!!
//3.7 ja 3.8 tekemättä
//3.9, 3.10 ja 3.11 OK! Frontendin toiminta paikallikesti?
//Seuraavaksi tietokanta


const express = require('express')
const app = express()

const cors = require('cors')

app.use(cors())

app.use(express.json())
app.use(express.static('build'))

let persons = [
  { 
      id: 1,
      name: "Arto Hellas",
      number: "040-123456",
      show: true
     
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523",
      show: true
      
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345",
      show: true
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122",
      show: true
    },
    { 
      id: 5,
      name: "Jouni Tirkkonen", 
      number: "050-3297068",
      show: true
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World! h</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => {
    return person.id === id
  })
  if (person) {
    response.json(person)  
  } else {
      response.status(404).end()  
  }
  //console.log(person)
  response.json(person)
})

app.get('/info', (request, response) => {
  const personAmount = persons.length
  const timeStamp = new Date()
  //console.log(personAmount)
  
  response.send(`<p>Phonebook has info for ${personAmount} people</p>
  <p>${timeStamp}</p>`)                      
  /*const id = Number(request.params.id)
  const person = persons.find(person => {
    return person.id === id
  })
  if (person) {
    response.json(person)  
  } else {
      response.status(404).end()  
  }
  //console.log(person)
  response.json(person)*/
})

//id:n generointi
const generateId = () => {
  const idNumbers = persons.map(person => person.id)
  let newId = Math.floor(Math.random() * 1e6) + 1  
  while (idNumbers.includes(newId)){
    newId = Math.floor(Math.random() * 1e6) + 1
    //console.log("in while", newId)
  } 
 
  console.log("id", newId)
  return newId
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'Name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'Number missing'
    })
  }

  //Check if name is already in server
  if ((persons.map(person => person.name)).includes(body.name)) {
    return response.status(400).json({
      error: 'A name must be unique'
    })  
  }
  //const names = persons.map(person => person.name)
  //if (names.includes(body.name))

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
    show: true
  }

  persons = persons.concat(person)
  //console.log(request.headers)
  response.json(person)
})


  


  
  
  /*app.post('/api/notes', (request, response) => {
    const body = request.body
  
    
  
    const note = {
      content: body.content,
      important: body.important || false,
      date: new Date(),
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })*/








app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})



/*const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(persons))
})*/

/*const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})*/

//Git repositorio seuraavaksi

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})