import React from 'react';

import Card from '../components/Card/Card';
import Category from '../components/Category/Category';
import Sort from '../components/Sort/Sort';
import CardSkeleton from '../components/Card/CardSkeletonBlock';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  const [categoryId, setCategoryId] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://69bd240a2bc2a25b22ad7544.mockapi.io/items?${categoryId ? `category=${categoryId}` : ''}&sortBy=${sortType.sortProperty}&order=desc`,
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(Array.isArray(json) ? json : []);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  console.log(typeof items);

  return (
    <div className="container">
      <div className="content__top">
        <Category value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onChangeType={(i) => setSortType(i)} />
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
