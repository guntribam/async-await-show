import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
    state = {
        people: []
    }

    getPeopleNames = () => {
        fetch("http://localhost:3000/names")
            .then((resp) => {
                console.log("resp funciona", resp);
                return resp.json()
            })
            .then((data) => {
                console.log("olha o json", data)
                this.setState({
                    people: data
                })
                console.log(this.state.people)
            })
            .catch((error) => {console.log("ERROR:",error)})
    }

    getPeopleNamesModern = async () => {
        try{
            const resp = await fetch("http://localhost:3000/names")
            const jsonData = await resp.json()
            const data = JSON.parse(jsonData)
            this.setState({
                people: data.results
            })
        }catch(error){
            console.log("ERROR:", error)
        }
    }

    render() {
        return <div>
            <h1>Welcome to the list of people names</h1>
            <button onClick={() => this.getPeopleNamesModern()}>Load Names</button>
                <ul>
                    {this.state.people.map(person => <li>{person.name.first}</li>)}
                </ul>
            </div>
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));