import './scss/app.scss';

import React from 'react';

import Card from './components/Card/Card';
import Category from './components/Category/Category';
import Header from './components/Header/Header';
import Sort from './components/Sort/Sort';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Category />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              <Card title={'Чизбургер-пицца'} price={395} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
