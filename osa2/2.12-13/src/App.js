import React from 'react';
import axios from 'axios'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentWillMount() {
    console.log('will mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {

    return (
      <div>
        <Kentta
          state={this.state}
          handleFilterChange={this.handleFilterChange}
        />
        <CountriesToShow
          countries={this.state.countries}
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />
      </div>

    );
  }
}

const Kentta = (props) => {
  return (
    <div>
      <form>
        find countries: <input
          value={props.state.filter}
          onChange={props.handleFilterChange}
        />
      </form>
    </div>
  )
}

const CountriesToShow = ({ countries, filter, handleFilterChange }) => {

  const countriesToShow =
    countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))

  if (countriesToShow.length === 1) {
    return (
      <Country country={countriesToShow[0]} />
    )
  } else if (countriesToShow.length > 10) {
    return (
      <div>
        <p>too many matches, specify another filter</p>
      </div>
    )
  } else {
    return (
      <div>
        <ul>
          {countriesToShow.map(country =>
            <CountryList key={country.name} country={country} filter={handleFilterChange} />)}
        </ul>
      </div>
    )
  }
}

const Country = ({ country }) => {
  return (
    <div>
      <h3>{country.name} </h3>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} height="100" width="120" alt="lippu" />
    </div>
  )
}

const CountryList = ({ country, filter}) => {

  const handleClick = (props) => {
    country.target = []
    country.target.value = country.name
    filter(country)
    
  }

  return (
    <div>
      <li onClick={handleClick}>
      {country.name}
      </li>
    </div>
  )
}

export default App;