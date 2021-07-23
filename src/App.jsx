import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import MovieDetail from './components/moviedetail/MovieDetail';
import Search from './components/search/Search';

function App() {

  return (
    <main>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={MovieDetail} />
        <Route path="/search/:id" component={Search} />

      </Switch>
      
    </main>
  );
}

export default App;
