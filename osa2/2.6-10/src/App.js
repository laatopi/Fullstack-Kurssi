import React from 'react';
import personService from './services/persons'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: '',
      error: ''
    }
  }

  componentWillMount() {
    console.log('will mount')
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  ajastin() {
    return (
      setTimeout(() => {
        this.setState({ error: '' })
      }, 5000)
    )
  }

  deletePerson = (person) => () => {

    if (window.confirm("Poistetaanko ?") === false) {
      return;
    }

    console.log('lollll')
    personService
      .deletePerson(person.id)
      .then(response => {
        console.log('viesti')
        this.setState({
          persons: this.state.persons.filter(personss => person.id !== personss.id),
          newName: '',
          newNumber: '',
          filter: ''
        })
        this.setState({
          message: 'poistettu',
          error: 'success'
        })
        this.ajastin()
      })
      .catch(error => {
        this.setState({
          message: 'nimi on jo poistettu!!',
          error: 'error'
        })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log('nappia painettu')

    const newName = this.state.newName
    var x = false
    let potential = ''

    this.state.persons.forEach(function (item, index, array) {
      if (item.name.toUpperCase() === newName.toUpperCase()) {

        x = true
        potential = item
      }

    });
    if (x === false) {
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      personService
        .create(personObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: ''
          })
          this.setState({
            message: 'Uusi nimi luotu',
            error: 'success'
          })
        })
        .catch(error => {
          this.setState({
            message: 'nimi on jo poistettu!!',
            error: 'error'
          })
        })
      this.ajastin()
    } else {
      if (window.confirm(this.state.newName + " on jo luettelossa, korvataanko vanha numero uudella?") === false) {
        return;
      }
      console.log(potential)
      const update = { ...potential, number: this.state.newNumber }
      console.log('hmm')
      personService
        .update(potential.id, update)
        .then(response => {
          const persons = this.state.persons.filter(n => n.id !== potential.id)
          this.setState({
            persons: persons.concat(update),
            newName: '',
            newNumber: ''
          })
          this.ajastin()
        })
        .catch(error => {
          this.setState({
            message: 'nimi on jo poistettu!!',
            error: 'error'
          })
        })

    }

  }

  handlePersonChange = (event) => {
    this.setState({ newName: event.target.value })
  }



  handeFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {

    const personsToShow =
      this.state.persons.filter(person =>
        person.name.toUpperCase().includes(this.state.filter.toUpperCase())
      )

    return (
      <div>
        <Notification message={this.state.message} current={this.state.error} />
        <h2>Puhelinluettelo</h2>

        <div>
          <form>
            rajaa näytettäviä: <input
              value={this.state.filter}
              onChange={this.handeFilterChange}
            />
          </form>
        </div>

        <h3>Lisää uusi</h3>

        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handlePersonChange}
            />
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
          {personsToShow.map(person =>
            <Person key={person.name} person={person} deletePerson={this.deletePerson} />
          )}

        </ul>
      </div>
    )
  }
}

const Person = ({ person, deletePerson }) => {
  return (
    <li>{person.name} {person.number} <button onClick={deletePerson(person)}>poista</button></li>
  )
}

const Notification = ({ current, message }) => {
  if (current === '') {
    return null
  }
  if (current === 'error') {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else {
    return (
      <div className="success">
        {message}
      </div>
    )
  }
}



export default App