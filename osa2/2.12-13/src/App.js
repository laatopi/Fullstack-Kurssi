import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
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
      </div>
    );
  }
}

let Kentta = (props) => {
  return (
    <form>
      find countries: <input
        value={props.state.filter}
        onChange={props.handleFilterChange}
      />
    </form>
  )
}

export default App;