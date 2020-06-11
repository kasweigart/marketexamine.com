import React from 'react';
import './App.css';
import RSNav from './components/NavbarToggler'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home'

function App() {

  return (
    
    <BrowserRouter>
    <div>
    <RSNav />
      <div className='container'>
        <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        </Switch>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
