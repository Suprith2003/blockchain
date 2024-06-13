// src/App.js
import React, { useEffect, useState } from 'react';
import web3 from './web3';
import Association from './Association';
import './App.css';

function App() {
  const [account, setAccount] = useState('');
  const [isPresident, setIsPresident] = useState(false);
  const [isVicePresident, setIsVicePresident] = useState(false);
  const [description, setDescription] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadAccount() {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const president = await Association.methods.president().call();
      const vicePresident = await Association.methods.vicePresident().call();

      setIsPresident(accounts[0] === president);
      setIsVicePresident(accounts[0] === vicePresident);

      const totalEvents = await Association.methods.totalEvents().call();
      const eventsArray = [];
      for (let i = 0; i < totalEvents; i++) {
        const event = await Association.methods.events(i).call();
        eventsArray.push(event);
      }
      setEvents(eventsArray);
    }

    loadAccount();
  }, []);

  const createEvent = async () => {
    await Association.methods.createEvent(description).send({ from: account });
    setDescription('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Association Membership</h1>
        <p>Connected Account: {account}</p>
        {isPresident || isVicePresident ? (
          <div>
            <h2>Create Event</h2>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={createEvent}>Create Event</button>
          </div>
        ) : null}
        <h2>Events</h2>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              {event.description}
              {/* Add voting buttons here */}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;

