import React from 'react';
import './App.css';
import VideoChat from './VideoChat';
import { Navbar,Nav } from 'react-bootstrap';

const App = () => {
  return (
    <div className="app">
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home" className='m-2 text-camelcase'>Conferencing </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home" className='text-xl'>Home</Nav.Link>

    </Nav>
  </Navbar>
      {/* <header>
        <h1>Join Live Session</h1>
      </header> */}
      <main>
        <VideoChat />
      </main>
     
    </div>
  );
};

export default App;
