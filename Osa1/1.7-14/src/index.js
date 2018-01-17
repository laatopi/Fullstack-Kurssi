
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            aanestetyin: 0,
            render: 0
        }
    }

    satunnoi = () => {
        return () => {
            this.setState({ selected: Math.floor((Math.random() * 6)) })
        }
    }

    aanesta = () => {
        return () => {
            this.enitenAania()
            this.props.anecdotes[this.state.selected].aanet = this.props.anecdotes[this.state.selected].aanet + 1
            this.render()
            this.enitenAania()
            this.setState({ render:0})
        }

    }

    enitenAania = () => {
       
        return () => {
            let eniten = this.props.anecdotes[0]
            let indeksi = 0
            this.props.anecdotes.forEach(function (item, index, array) {
                if (item.aanet > eniten.aanet) {
                    eniten = item
                    indeksi = index
                }
                console.log("HULABALOOOOO" + indeksi)
            })
            this.setState({ aanestetyin: indeksi })
            this.setState({ render:0})
        }
    }

    render() {
        const Satunnoija = () => {
            return (
                <div>
                    <button onClick={this.satunnoi()}>
                        next anecdote
                    </button>
                </div>
            )
        }

        const Aanestaja = () => {
            return (
                <div>
                    {this.enitenAania()}
                    < button onClick={this.aanesta()} >
                        vote
                </button >
                </div>
            )

        }

        return (
            <div>
                <div>{this.state.selected}</div>
                {this.props.anecdotes[this.state.selected].anekdootti}
                <p>has {this.props.anecdotes[this.state.selected].aanet} votes </p>
                <p></p>
                < button onClick={this.aanesta()}  >
                    vote
                </button >
                <Satunnoija />
                <h1> anecdotes with the most votes:</h1>
                {this.props.anecdotes[this.state.aanestetyin].anekdootti}
                <p>has {this.props.anecdotes[this.state.aanestetyin].aanet} votes </p>
            </div>

        )
    }
}



const anecdotes = [
    { anekdootti: 'If it hurts, do it more often', aanet: 0 },
    { anekdootti: 'Adding manpower to a late software project makes it later!', aanet: 0 },
    { anekdootti: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', aanet: 0 },
    { anekdootti: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', aanet: 0 },
    { anekdootti: 'Premature optimization is the root of all evil.', aanet: 0 },
    { anekdootti: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', aanet: 0 }
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)