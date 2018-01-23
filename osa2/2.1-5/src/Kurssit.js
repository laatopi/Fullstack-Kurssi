import React from 'react'

const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>

const Osa = ({ osa }) => {
    return (
        <li>{osa.nimi} {osa.tehtavia}</li>
    )
}

const Kurssi = ({ kurssi }) => {
    const tehtavat = kurssi.osat.map(osa => osa.tehtavia)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <ul>
                {kurssi.osat.map(osa => <Osa key={osa.id} osa={osa} />)}
            </ul>
            <p>Yhteensä: {tehtavat.reduce(reducer)} tehtävää</p>
        </div>
    )

}

const Kurssit = ({ kurssit }) => {
    return (
        <div>
            {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
        </div>
    )
}

export default Kurssit