import './scss/app.scss';

import React from 'react';

import Card from './components/Card/Card';
import Category from './components/Category/Category';
import Header from './components/Header/Header';
import Sort from './components/Sort/Sort';

import db from './db.json';

const pizzas = db.pizzas;

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
              {pizzas.map((obj) => (
                <Card
                  key={obj.id}
                  title={obj.name}
                  price={obj.price}
                  image={obj.imageUrl}
                  sizes={obj.sizes}
                  types={obj.types}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
