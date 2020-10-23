const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://jtirkkon:${password}@cluster0.ar9ix.mongodb.net/phonebook?retryWrites=true`
//`mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  //id: Number,
  name: String,
  number: String,
  show: Boolean
})

//const Note = mongoose.model('Note', noteSchema)
const Person = mongoose.model('Person', noteSchema)

const person = new Person({
  name: name,
  number: number,
  show: true,
})

if (process.argv.length === 5) {
  person.save().then(response => {
    console.log('person saved!')
   mongoose.connection.close()
  })
}

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}