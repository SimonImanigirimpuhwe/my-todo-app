import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import todoPage from './components/Dashboard';

function App() {
  return (
    <div>
      <Navbar/>
      <Router>
      <Switch>
        <Route exact path="/dashboard" component={todoPage}/>
        <Route exact path="/" component={Login}/>
      </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
