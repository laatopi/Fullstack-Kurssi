import React from 'react'
import ReactDOM from 'react-dom'


class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            painettu: false
        }
    }

    klikHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1
        })
        this.setState({
            painettu: true
        })
    }

    klikNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1
        })
        this.setState({
            painettu: true
        })
    }

    klikHuono = () => {
        this.setState({
            huono: this.state.huono + 1
        })
        this.setState({
            painettu: true
        })
    }


    asetaArvoon = (arvo) => {
        return () => {
            this.setState({ counter: arvo })
        }
    }

    palauteAnnettu = () => {
        this.setState({ painettu: true })
    }



    render() {

        let UserMessage
        if (this.state.painettu) {
            UserMessage = (
                <span>
                    <h2>{`Welcome Back ${this.props.name}`}</h2>
                    <p>You can visit settings to reset your password</p>
                </span>
            )
        } else {
            UserMessage = (
                <h2>Hey man! Sign in to see this section</h2>
            )
        }


        const Display = ({ counter, text }) => <div>{text}: {counter}</div>

        const Statistics = () => (
            <div>
                <Display counter={this.state.hyva} text='hyvä' />
                <Display counter={this.state.neutraali} text='neutraali' />
                <Display counter={this.state.huono} text='huono' />
            </div>
        )



        const Statistic = () => (

            <div>
                <Display counter={(this.state.hyva + this.state.huono * -1) /
                    (this.state.hyva + this.state.huono + this.state.neutraali)} text='keskiarvo' />
                <Display counter={this.state.hyva / (this.state.hyva + this.state.neutraali + this.state.neutraali) * 100} text='positiiviset' />
            </div>
        )

        const Button = ({ handleClick, text }) => (
            <button onClick={handleClick}>
                {text}
            </button>
        )
        const Stats = () => (
            <div>

            </div>
        )

        console.log('renderöidään', this.state.hyva)
        return (
            <div>
                <h1>anna palautetta </h1>
                <div>
                    <Button handleClick={this.klikHyva} text='Hyvä' />
                    <Button handleClick={this.klikNeutraali} text='Neutraali' />
                    <Button handleClick={this.klikHuono} text='Huono' />
                </div>

                <h1>statistiikka </h1>
                <Statistics />
                <Statistic />
                <UserMessage/>

            </div>
        )
    }
}









ReactDOM.render(
    <App />,
    document.getElementById('root')
)