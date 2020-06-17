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
        <Route path='/markets'>
          <Markets />
        </Route>
        <Route path='/news'>
          <News />
        </Route>
        <Route path='/my-watchlist'>
          <MyWatchlist />
        </Route>
        <Route path='/tools'>
          <Tools />
        </Route>
        <Route path='/crypto'>
          <Crypto />
        </Route>
        <Route path='/contact'>
          <Contact />
        </Route>
        <Route path='/sign-up' />
        <Route path='/login' />
        </Switch>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
