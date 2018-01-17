import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            yhteensa: 0,
        }
    }

    kasvataPalautetta = (palaute) => {
        if (palaute == 'hyva') {
            return () => {
                this.setState({ hyva: this.state.hyva + 1 })
                this.setState({ yhteensa: this.state.yhteensa + 1 })
            }
        } else if (palaute == 'neutraali') {
            return () => {
                this.setState({ neutraali: this.state.neutraali + 1 })
                this.setState({ yhteensa: this.state.yhteensa + 1 })

            }
        } else {
            return () => {
                this.setState({ huono: this.state.huono + 1 })
                this.setState({ yhteensa: this.state.yhteensa + 1 })

            }
        }
    }

    keskiarvo = () => {
        return (this.state.hyva + -1 * this.state.huono) / this.state.yhteensa

    }

    positiivisia = () => {
        return this.state.hyva / this.state.yhteensa * 100

    }

    dataaAnnettu = () => {
        return this.state.yhteensa != 0
    }


    render() {

        const Button = ({ handleClick, text }) => (
            <button onClick={handleClick}>
                {text}
            </button>
        )

        const Statistics = () => (
            <div>
                <tr>
                    <td>hyvä:</td>
                    <td>{this.state.hyva}</td>
                </tr>
                <tr>
                    <td>neutraali:</td>
                    <td>{this.state.neutraali}</td>
                </tr>
                <tr>
                    <td>huono:</td>
                    <td>{this.state.huono}</td>
                </tr>
            </div>
        )

        const Statistic = () => (
            <div>
                <tr>
                    <td>keskiarvo:</td>
                    <td>{this.keskiarvo()}</td>
                </tr>
                <tr>
                    <td>positiviisia:</td>
                    <td>{this.positiivisia()} %</td>
                </tr>
            </div>
        )



        return (
            <div>
                <h1>anna palautetta</h1>
                <Button
                    handleClick={this.kasvataPalautetta("hyva")}
                    text="Hyva"
                />
                <Button
                    handleClick={this.kasvataPalautetta("neutraali")}
                    text="Neutraali"
                />
                <Button
                    handleClick={this.kasvataPalautetta("huono")}
                    text="Huono"
                />
                <h1>statistiikka</h1>
                {this.dataaAnnettu() ? <Statistics /> : 'Palautetta ei annettu.'}
                {this.dataaAnnettu() ? <Statistic /> : ''}
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
