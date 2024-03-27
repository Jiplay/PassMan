import {useState} from 'react';
import logo from './assets/images/logo-universal.png';
import './App.css';
import {Greet} from "../wailsjs/go/main/App";
import {Register} from "../wailsjs/go/main/App";

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updatePassword = (e: any) => setPassword(e.target.value);
    let resp;
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    async function register() {
        resp = await Register(name, password)
        console.log(resp);
    }

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo"/>
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="inputLogin" type="text"/>
                <input id="password" className="input" onChange={updatePassword} autoComplete="off" name="inputPassword" type="text"/>
                <button className="btn" onClick={greet}>Greet</button>
                <button className="btn" onClick={register}>Register</button>
            </div>
        </div>
    )
}

export default App
