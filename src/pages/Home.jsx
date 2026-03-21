import React from 'react';

import Card from '../components/Card/Card';
import Category from '../components/Category/Category';
import Sort from '../components/Sort/Sort';
import CardSkeleton from '../components/Card/CardSkeletonBlock';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://69bd240a2bc2a25b22ad7544.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="content__top">
        <Category />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <CardSkeleton key={index} />)
          : items.map((obj) => (
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
  );
};

export default Home;
