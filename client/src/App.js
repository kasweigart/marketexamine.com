import React from 'react';
import './App.css';
import RSNav from './components/NavbarToggler'
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Home from './components/Home'
import Markets from './components/Markets'
import News from './components/News'
import MyWatchlist from './components/MyWatchlist'
import Tools from './components/Tools'
import Crypto from './components/Crypto'
import Contact from './components/Contact'
import Login from './components/Login'
import Footer from './components/Footer'


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
        <Route exact path='/markets'>
          <Markets />
        </Route>
        <Route exact path='/news'>
          <News />
        </Route>
        <Route exact path='/my-watchlist'>
          <MyWatchlist />
        </Route>
        <Route exact path='/tools'>
          <Tools />
        </Route>
        <Route exact path='/crypto'>
          <Crypto />
        </Route>
        <Route exact path='/contact'>
          <Contact />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        </Switch>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
