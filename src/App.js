import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Footer from './components/Footer';
import TodoPage from './components/Dashboard';

function App() {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/dashboard" component={TodoPage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
