import React from 'react';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Корзина пуста <span>😞</span>
        </h2>
        <p>
          Вероятней всего, вы не заказывали еще пиццу.
          <br />
          Для того, чтобы заказать пиццу, перейди на главную страницу.
        </p>
        <Link to="/">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
