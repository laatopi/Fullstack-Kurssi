import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        {
          name: 'Arto Hellas',
          number: '040-50560'
        }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log('nappia painettu')

    const newName = this.state.newName
    var x = false

    this.state.persons.forEach(function (item, index, array) {
      console.log(item, index);
      if (item.name.toUpperCase() === newName.toUpperCase()) {
        console.log('jaaahas')
        x = true
      }
    });


    if (x === false) {
      console.log(this.state.persons.indexOf(this.state.newName))
      const personObject = {
        name: this.state.newName,
        number: this.state.newNumber
      }

      const persons = this.state.persons.concat(personObject)

      this.setState({
        persons: persons,
        newName: '',
        newNumber: ''
      })
    }
  }

  handlePersonChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handeFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {

    const personsToShow =
      this.state.persons.filter(person => person.name.toUpperCase().includes(this.state.filter.toUpperCase))


    return (
      <div>
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

            numero <input
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
          {personsToShow.map(person => <Person key={person.name} person={person} />)}
        </ul>
      </div>
    )
  }
}




const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}


export default App