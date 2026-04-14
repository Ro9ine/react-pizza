import React from 'react';
import { useParams } from 'react-router-dom';

function FullPizza() {
  const params = useParams();

  return (
    <div className="container">
      <img src="" />
      <h2>Пицца</h2>
      <p>Ну тут типо какое то описание пиццы</p>
      <h4>10000000 руб</h4>
    </div>
  );
}

export default FullPizza;
